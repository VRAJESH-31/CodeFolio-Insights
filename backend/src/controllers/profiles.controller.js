import ProfileModel from '../models/profiles.model.js';
import UserModel from '../models/user.model.js';
import mongoose from 'mongoose';
import redisClient from '../config/redis.js';
import asyncHandler from '../utils/asyncHandler.js';
import { PLATFORMS } from '../constant/index.js';
import * as platformsFetching from '../utils/fetching/platformsFetch.js';


const getProfiles = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const profiles = await ProfileModel.findOneAndUpdate(
        { userId: userId },
        { userId: userId },
        {
            new: true,
            upsert: true, // Key: create if not found
            setDefaultsOnInsert: true // Use schema defaults (e.g., empty strings for usernames)
        }
    );

    if (!profiles) return res.status(500).json({ message: "Failed to retrieve the user data." });
    return res.status(200).json(profiles);
});

const updateProfile = asyncHandler(async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = req.user;
        const { platformName, platformUsername } = req.query;

        const platformKey = PLATFORMS[platformName].field;

        const profile = await ProfileModel.findOneAndUpdate(
            { userId: user._id },
            { [platformKey]: platformUsername },
            { new: true, upsert: true, session }
        );

        if (!profile) {
            await session.abortTransaction();
            return res.status(500).json({ message: "Failed to update the user data." });
        }

        const profilesData = await redisClient.get(`profileData:${user._id}`);
        const existingData = profilesData ? JSON.parse(profilesData) : {};

        const platformFreshData = await PLATFORMS[platformName].fetchFunction(platformUsername);
        if (!platformFreshData) {
            await session.abortTransaction();
            return res.status(200).json({ message: "Failed to fetch the user data." });
        }

        let mergedData = { ...existingData };
        mergedData[platformName] = platformFreshData;

        await session.commitTransaction();
        if (mergedData) await redisClient.set(`profileData:${user._id}`, JSON.stringify(mergedData));

        return res.status(200).json(profile);

    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
});

const updateProfiles = asyncHandler(async (req, res) => {
    const user = req.user;
    const updateFields = req.body;

    const userId = user._id;

    let $setFields = { ...updateFields };
    delete $setFields.userId;

    const updatedProfile = await ProfileModel.findOneAndUpdate(
        { userId: userId },
        { $set: $setFields },
        { new: true, runValidators: true, upsert: true }
    );

    if (!updatedProfile) return res.status(404).json({ message: "Could not update user profile links." });
    return res.status(200).json(updatedProfile);
});

const getProfileCache = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const cachedDataParams = await redisClient.get(`profileData:${userId}`);

    if (cachedDataParams) return res.status(200).json(JSON.parse(cachedDataParams));
    return res.status(200).json(null);
});

const refreshProfileData = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const profileLinks = await ProfileModel.findOne({ userId });

    if (!profileLinks) return res.status(404).json({ message: "User profiles not configured." });

    const freshData = {
        gfg: profileLinks.gfgUsername ? await platformsFetching.fetchGfgData(profileLinks.gfgUsername) : null,
        codechef: profileLinks.codechefUsername ? await platformsFetching.fetchCodeChefData(profileLinks.codechefUsername) : null,
        interviewbit: profileLinks.interviewbitUsername ? await platformsFetching.fetchInterviewbitData(profileLinks.interviewbitUsername) : null,
        code360: profileLinks.code360Username ? await platformsFetching.fetchCode360Data(profileLinks.code360Username) : null,
        hackerrank: profileLinks.hackerrankUsername ? await platformsFetching.fetchHackerRankData(profileLinks.hackerrankUsername) : null,
        leetcode: profileLinks.leetCodeUsername ? await platformsFetching.fetchLeetCodeData(profileLinks.leetCodeUsername) : null,
        github: profileLinks.githubUsername ? await platformsFetching.fetchGitHubData(profileLinks.githubUsername) : null,
    };

    const cachedJson = await redisClient.get(`profileData:${userId}`);
    const existingData = cachedJson ? JSON.parse(cachedJson) : {};

    const mergedData = { ...existingData };

    Object.keys(PLATFORMS).forEach(platform => {
        let usernameKey = PLATFORMS[platform]?.field;

        if (!profileLinks[usernameKey]) {
            mergedData[platform] = null;
        } else {
            if (freshData[platform]) {
                if (!mergedData[platform]) {
                    mergedData[platform] = freshData[platform];
                } else {
                    const freshPlatformData = freshData[platform];
                    const cachedPlatformData = mergedData[platform];

                    const mergedPlatformData = { ...cachedPlatformData };

                    Object.keys(freshPlatformData).forEach(key => {
                        if (freshPlatformData[key] !== null && freshPlatformData[key] !== undefined) {
                            mergedPlatformData[key] = freshPlatformData[key];
                        }
                    });

                    mergedData[platform] = mergedPlatformData;
                }
            }
        }
    });

    mergedData.lastUpdated = Date.now();
    await redisClient.set(`profileData:${userId}`, JSON.stringify(mergedData));

    const user = await UserModel.findOne({ _id: userId });
    if (user) {
        user.lastRefresh = Date.now();
        await user.save();
    }

    return res.status(200).json(mergedData);
});


export {
    getProfiles,
    updateProfile,
    updateProfiles,
    refreshProfileData,
    getProfileCache
}
