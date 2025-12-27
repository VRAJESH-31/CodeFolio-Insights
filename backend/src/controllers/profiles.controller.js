import ProfileModel from '../models/profiles.model.js';
import mongoose from 'mongoose';
import redisClient from '../config/redis.js';
import handleError from '../utils/handleError.js';
import { platforms } from '../constant/constants.js';
import * as platformsFetching from '../utils/fetching/platformsFetch.js';


const getProfiles = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) return res.status(200).json({ message: "User id is required!" });
        if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ message: "Invalid user ID format." });

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

    } catch (error) {
        return handleError(res, error, "Couldn't retrieve user profile links");
    }
};

const updateProfile = async (req, res) => {

    const session = await mongoose.startSession();

    try {
        const user = req.user;
        const { platformName, platformUsername } = req.query;

        if (!platformName || !platformUsername) return res.status(200).json({ message: "Platform name and username are required!" });
        if (!Object.keys(platforms).includes(platformName)) return res.status(200).json({ message: "Invalid platform name!" });

        const platformKey = platforms[platformName].field;

        session.startTransaction();

        const profile = await ProfileModel.findOneAndUpdate(
            { userId: user._id },
            { [platformKey]: platformUsername },
            { new: true, upsert: true, session }
        );

        if (!profile) return res.status(500).json({ message: "Failed to update the user data." });

        let mergedData = null;

        if (platforms[platformName].isCodingPlatform) {
            const profilesData = await redisClient.get(`profileData:${user._id}`);
            const existingData = profilesData ? JSON.parse(profilesData) : {};

            const platformFreshData = await platforms[platformName].fetchFunction(platformUsername);
            if (!platformFreshData) {
                await session.abortTransaction();
                return res.status(200).json({ message: "Failed to fetch the user data." });
            }

            mergedData = { ...existingData };
            mergedData[platformName] = platformFreshData;
        }

        await session.commitTransaction();
        if (mergedData) await redisClient.set(`profileData:${user._id}`, JSON.stringify(mergedData));

        return res.status(200).json(profile);

    } catch (error) {
        await session.abortTransaction();
        return handleError(res, error, "Couldn't update user profile links");
    } finally {
        session.endSession();
    }
}

const updateProfiles = async (req, res) => {
    try {
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
    } catch (error) {
        return handleError(res, error, "Couldn't update user profile links");
    }
};

const getProfileCache = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) return res.status(200).json(null);

        const cachedDataParams = await redisClient.get(`profileData:${userId}`);

        if (cachedDataParams) return res.status(200).json(JSON.parse(cachedDataParams));
        return res.status(200).json(null);

    } catch (error) {
        return handleError(res, error, "Couldn't fetch user profile cache");
    }
}


const refreshProfileData = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) return res.status(400).json({ message: "UserId not provided" });

        const profileLinks = await ProfileModel.findOne({ userId: userId });
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

        Object.keys(platforms).forEach(platform => {
            if (!platforms[platform].isCodingPlatform) return;
            let usernameKey = platforms[platform]?.field;

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

        return res.status(200).json(mergedData);

    } catch (error) {
        return handleError(res, error, "Couldn't fetch user profiles data.");
    }
}


export {
    getProfiles,
    updateProfile,
    updateProfiles,
    refreshProfileData,
    getProfileCache
}