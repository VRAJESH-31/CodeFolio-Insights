import ProfileModel from '../models/profile.model.js';
import UserModel from '../models/user.model.js';
import redisClient from '../config/redis.config.js';
import { PLATFORMS } from '../constants/index.js';
import * as platformsFetching from '../utils/fetching/platforms.fetch.util.js';
import mongoose from 'mongoose';
import ApiError from '../utils/api-error.util.js';

const getProfiles = async (displayName, currentUser) => {
    const user = await UserModel.findOne({ displayName });
    if (!user) throw new ApiError(404, "User not found.");

    const userId = user._id;

    const profiles = await ProfileModel.findOneAndUpdate(
        { userId: userId },
        { userId: userId },
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true
        }
    );

    if (!profiles) throw new ApiError(500, "Failed to retrieve the user data.");
    return profiles;
};

const updateProfile = async (userId, platformName, platformUsername) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const platformKey = PLATFORMS[platformName].field;

        const profile = await ProfileModel.findOneAndUpdate(
            { userId: userId },
            { [platformKey]: platformUsername },
            { new: true, upsert: true, session }
        );

        if (!profile) {
            await session.abortTransaction();
            throw new ApiError(500, "Failed to update the user data.");
        }

        const profilesData = await redisClient.get(`profileData:${userId}`);
        const platformRefreshedData = await PLATFORMS[platformName].fetchFunction(platformUsername);

        if (!platformRefreshedData) {
            await session.abortTransaction();
            throw new ApiError(500, "Failed to fetch the user data.");
        }

        let mergedData = { ...profilesData };
        mergedData[platformName] = platformRefreshedData;

        await session.commitTransaction();
        if (mergedData) await redisClient.set(`profileData:${userId}`, mergedData);

        return profile;

    } catch (error) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        throw error;
    } finally {
        session.endSession();
    }
};

const getProfileCache = async (displayName, currentUser) => {
    const user = await UserModel.findOne({ displayName });
    if (!user) throw new ApiError(404, "User not found.");

    const userId = user._id;

    const cachedDataParams = await redisClient.get(`profileData:${userId}`);
    return cachedDataParams || null;
};

const refreshProfileData = async (displayName, currentUser) => {
    const user = await UserModel.findOne({ displayName });
    if (!user) throw new ApiError(404, "User not found.");

    const userId = user._id;

    const profileLinks = await ProfileModel.findOneAndUpdate(
        { userId },
        { userId },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    if (!profileLinks) throw new ApiError(500, "Failed to configure user profiles.");

    const cachedData = await redisClient.get(`profileData:${userId}`) || {};

    const PLATFORMS_WITH_MULTIYEAR_SUBMISSION_DATA = ['gfg', 'interviewbit', 'code360', 'leetcode'];
    const currentYear = new Date().getFullYear();

    const fetchPlatformData = async (platform, username) => {
        if (!username) return null;
        if (platform === 'github') return await platformsFetching.fetchGitHubData(username);

        if (PLATFORMS_WITH_MULTIYEAR_SUBMISSION_DATA.includes(platform)) {
            const hasCurrentYearData = cachedData[platform]?.submission?.[currentYear];
            if (hasCurrentYearData) {
                return await PLATFORMS[platform].fetchFunction(username, currentYear);
            }
        }
        return await PLATFORMS[platform].fetchFunction(username);
    };

    const refreshedData = {
        gfg: await fetchPlatformData('gfg', profileLinks.gfgUsername),
        codechef: await fetchPlatformData('codechef', profileLinks.codechefUsername),
        interviewbit: await fetchPlatformData('interviewbit', profileLinks.interviewbitUsername),
        code360: await fetchPlatformData('code360', profileLinks.code360Username),
        hackerrank: await fetchPlatformData('hackerrank', profileLinks.hackerrankUsername),
        leetcode: await fetchPlatformData('leetcode', profileLinks.leetCodeUsername),
        github: await fetchPlatformData('github', profileLinks.githubUsername),
    };

    const mergedData = { ...cachedData };

    Object.keys(PLATFORMS).forEach(platform => {
        let usernameKey = PLATFORMS[platform]?.field;

        if (!profileLinks[usernameKey]) {
            mergedData[platform] = null;
        } else {
            const refreshedPlatformData = refreshedData[platform];
            const cachedPlatformData = mergedData[platform];
            const mergedPlatformData = { ...cachedPlatformData };

            if (refreshedPlatformData) {
                if (!mergedPlatformData) {
                    mergedData[platform] = refreshedPlatformData;
                } else {
                    Object.keys(refreshedPlatformData).forEach(key => {
                        if (refreshedPlatformData[key] != null && refreshedPlatformData[key] != undefined && refreshedPlatformData[key] != [] && refreshedPlatformData[key] != {}) {
                            if (key === 'submission' && mergedPlatformData[key]) {
                                mergedPlatformData[key] = { ...mergedPlatformData[key], ...refreshedPlatformData[key] };
                            } else {
                                mergedPlatformData[key] = refreshedPlatformData[key];
                            }
                        }
                    });
                    mergedData[platform] = mergedPlatformData;
                }
            }
        }
    });

    mergedData.lastUpdated = Date.now();
    await redisClient.set(`profileData:${userId}`, mergedData);

    user.lastRefresh = Date.now();
    await user.save();

    return mergedData;
};

export {
    getProfiles,
    updateProfile,
    getProfileCache,
    refreshProfileData
};
