import UserModel from '../models/user.model.js';
import ProfileModel from '../models/profiles.model.js';
import axios from 'axios';
import mongoose from 'mongoose';
import * as leetcodeFetching from '../utils/fetching/leetcodeFetch.js';
import * as scrapeSpideyFetching from '../utils/fetching/scrapeSpideyFetch.js';
import * as githubFetching from '../utils/fetching/githubFetch.js';
import redisClient from '../config/redis.js';


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
        console.log("Error occurred while fetching user profile links: ", error.message);
        console.log(error.stack);
        return res.status(500).json({ "message": "Couldn't retrieve user profile links" });
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
        console.log("Error occurred while updating user profile links: ", error.message);
        console.log(error.stack);
        return res.status(500).json({ "message": "Couldn't update user profile links" });
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
        console.log("Error occurred while fetching user profile cache: ", error.message);
        console.log(error.stack);
        return res.status(500).json({ "message": "Couldn't fetch user profile cache" });
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
                // submission: await scrapeSpideyFetching.fetchGfgUserSubmissionData(profileLinks.gfgUsername),
            } : null,
            codechef: profileLinks.codechefUsername ? {
                profile: await scrapeSpideyFetching.fetchCodeChefUserData(profileLinks.codechefUsername),
                submission: await scrapeSpideyFetching.fetchCodeChefUserSubmissionData(profileLinks.codechefUsername),
            } : null,
            interviewbit: profileLinks.interviewbitUsername ? {
                profile: await scrapeSpideyFetching.fetchInterviewbitUserData(profileLinks.interviewbitUsername),
            } : null,
            leetcode: profileLinks.leetCodeUsername ? {
                profile: await leetcodeFetching.getLeetCodeProfileInfo(profileLinks.leetCodeUsername),
                badges: await leetcodeFetching.getLeetCodeBadges(profileLinks.leetCodeUsername),
                contest: await leetcodeFetching.getLeetCodeContestData(profileLinks.leetCodeUsername),
                problems: await leetcodeFetching.getLeetCodeProblemsCount(profileLinks.leetCodeUsername),
                submission: await leetcodeFetching.getLeetCodeUserStreaksAndCalendar(profileLinks.leetCodeUsername, new Date().getFullYear()),
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

        const platforms = ['gfg', 'codechef', 'interviewbit', 'leetcode', 'github'];

        platforms.forEach(platform => {
            // 1. If fresh data is explicitly null (meaning user has no username in DB for this),
            // then we should set mergedData field to null (overwriting any old cache).
            // However, our fetch logic above sets freshData[platform] to null if username is missing.
            // BUT it also sets it to null if fetch fails completely for some cases (depending on implementation).
            // Let's ensure we distinguish "not configured" vs "fetch failed".
            // We can check profileLinks keys. 

            let usernameKey = "";
            if (platform === 'gfg') usernameKey = 'gfgUsername';
            if (platform === 'codechef') usernameKey = 'codechefUsername';
            if (platform === 'interviewbit') usernameKey = 'interviewbitUsername';
            if (platform === 'leetcode') usernameKey = 'leetCodeUsername';
            if (platform === 'github') usernameKey = 'githubUsername';

            if (!profileLinks[usernameKey]) {
                // User removed their username, so remove from cache
                mergedData[platform] = null;
            } else {
                // User HAS a username.

                // If freshData[platform] is NOT null, we merge.
                if (freshData[platform]) {
                    if (!mergedData[platform]) {
                        // No previous cache for this platform, just take fresh
                        mergedData[platform] = freshData[platform];
                    } else {
                        // We have previous cache AND fresh data. Deep merge subfields.
                        // freshData[platform] is an object (e.g. { profile: ..., badges: ... })
                        const freshPlatformData = freshData[platform];
                        const cachedPlatformData = mergedData[platform];

                        const mergedPlatformData = { ...cachedPlatformData };

                        Object.keys(freshPlatformData).forEach(key => {
                            // If fresh subfield is NOT null, update it.
                            if (freshPlatformData[key] !== null && freshPlatformData[key] !== undefined) {
                                mergedPlatformData[key] = freshPlatformData[key];
                            }
                            // If fresh subfield IS null (fetch failed), keep cachedPlatformData[key] (if exists).
                        });

                        mergedData[platform] = mergedPlatformData;
                    }
                }
                // If freshData[platform] IS null (e.g. total fetch failure), keep existing mergedData[platform] as is.
            }
        });

        mergedData.lastUpdated = Date.now();

        await redisClient.set(`profileData:${userId}`, JSON.stringify(mergedData));

        return res.status(200).json(mergedData);

    } catch (error) {
        console.log("Error occurred while fetching user profiles data:", error.message);
        console.log(error.stack);
        return res.status(500).json({ "message": "Couldn't fetch user profiles data." });
    }
}


export {
    getProfiles,
    updateProfiles,
    refreshProfileData,
    getProfileCache
}