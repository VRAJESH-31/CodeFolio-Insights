import ProfileModel from '../models/profiles.model.js';
import mongoose from 'mongoose';
import * as leetcodeFetching from '../utils/fetching/leetcodeFetch.js';
import * as scrapeSpideyFetching from '../utils/fetching/scrapeSpideyFetch.js';
import * as githubFetching from '../utils/fetching/githubFetch.js';
import redisClient from '../config/redis.js';
import handleError from '../utils/handleError.js';


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
            gfg: profileLinks.gfgUsername ? {
                profile: await scrapeSpideyFetching.fetchGfgUserData(profileLinks.gfgUsername),
                submission: await scrapeSpideyFetching.fetchGfgUserMultiYearSubmissionData(profileLinks.gfgUsername),
            } : null,
            codechef: profileLinks.codechefUsername ? {
                profile: await scrapeSpideyFetching.fetchCodeChefUserData(profileLinks.codechefUsername),
                submission: await scrapeSpideyFetching.fetchCodeChefUserSubmissionData(profileLinks.codechefUsername),
            } : null,
            interviewbit: profileLinks.interviewbitUsername ? {
                profile: await scrapeSpideyFetching.fetchInterviewbitUserData(profileLinks.interviewbitUsername),
                badges: await scrapeSpideyFetching.fetchInterviewbitBadgesData(profileLinks.interviewbitUsername),
                submission: await scrapeSpideyFetching.fetchInterviewbitUserMultiYearSubmissionData(profileLinks.interviewbitUsername),
            } : null,
            code360: profileLinks.code360Username ? {
                profile: await scrapeSpideyFetching.fetchCode360UserData(profileLinks.code360Username),
                submission: await scrapeSpideyFetching.fetchCode360UserMultiYearSubmissionData(profileLinks.code360Username),
            } : null,
            hackerrank: profileLinks.hackerrankUsername ? {
                profile: await scrapeSpideyFetching.fetchHackerRankUserData(profileLinks.hackerrankUsername),
            } : null,
            leetcode: profileLinks.leetCodeUsername ? {
                profile: await leetcodeFetching.getLeetCodeProfileInfo(profileLinks.leetCodeUsername),
                badges: await leetcodeFetching.getLeetCodeBadges(profileLinks.leetCodeUsername),
                contest: await leetcodeFetching.getLeetCodeContestData(profileLinks.leetCodeUsername),
                problems: await leetcodeFetching.getLeetCodeProblemsCount(profileLinks.leetCodeUsername),
                submission: await leetcodeFetching.fetchLeetcodeUserMultiYearSubmissionData(profileLinks.leetCodeUsername),
                topicStats: await leetcodeFetching.getLeetCodeTopicWiseProblems(profileLinks.leetCodeUsername),
            } : null,
            github: profileLinks.githubUsername ? {
                profile: await githubFetching.getUserProfileData(profileLinks.githubUsername),
                contributions: await githubFetching.getContributionCount(profileLinks.githubUsername),
                commits: await githubFetching.getLastYearCommitsCount(profileLinks.githubUsername),
                calendar: await githubFetching.getContributionCalendar(profileLinks.githubUsername),
                badges: await githubFetching.getGithubContributionBadges(profileLinks.githubUsername),
                languageStats: await githubFetching.getUserLanguageStats(profileLinks.githubUsername)
            } : null
        };

        const cachedJson = await redisClient.get(`profileData:${userId}`);
        const existingData = cachedJson ? JSON.parse(cachedJson) : {};

        const mergedData = { ...existingData };

        const platforms = ['gfg', 'codechef', 'interviewbit', 'leetcode', 'github', 'code360', 'hackerrank'];

        platforms.forEach(platform => {
            let usernameKey = "";
            if (platform === 'gfg') usernameKey = 'gfgUsername';
            if (platform === 'codechef') usernameKey = 'codechefUsername';
            if (platform === 'interviewbit') usernameKey = 'interviewbitUsername';
            if (platform === 'leetcode') usernameKey = 'leetCodeUsername';
            if (platform === 'github') usernameKey = 'githubUsername';
            if (platform === 'code360') usernameKey = 'code360Username';
            if (platform === 'hackerrank') usernameKey = 'hackerrankUsername';

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
    updateProfiles,
    refreshProfileData,
    getProfileCache
}