import UserModel from '../models/user.model.js';
import ProfileModel from '../models/profiles.model.js';
import axios from 'axios';
import mongoose from 'mongoose';
import * as leetcodeFetching from '../utils/fetching/leetcodeFetch.js';
import * as scrapeSpideyFetching from '../utils/fetching/scrapeSpideyFetch.js';
import * as githubFetching from '../utils/fetching/githubFetch.js';


const getProfiles = async (req, res) => {
    try {
        const userId = req.params.userId;
        
        if (!userId) return res.status(200).json({message: "User id is required!"});
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

        if (!profiles) return res.status(500).json({message: "Failed to retrieve the user data."});
        return res.status(200).json(profiles);

    } catch (error) {
        console.log("Error occurred while fetching user profile links: ", error.message);
        console.log(error.stack);
        return res.status(500).json({"message" : "Couldn't retrieve user profile links"});
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
        return res.status(500).json({"message" : "Couldn't update user profile links"});
    }
};


const fetchProfilesData = async (req, res) => {
    try {
        const username = req.params.username;
        if (!username || !username.trim()) return res.status(400).json({message: "username not provided"});

        const user = await UserModel.findOne({name: username});
        if (!user) return res.status(404).json({message: "Invalid Username!"});

        const profilesLinksUrl = `${req.protocol}://${req.get("host")}/profiles/${user._id}`
        const profileLinksResponse = await axios.get(profilesLinksUrl);
        const profileLinks = profileLinksResponse.data;

        const profileData = {
            gfg : profileLinks.gfgUsername ? {
                profile : await scrapeSpideyFetching.fetchGfgUserData(profileLinks.gfgUsername),
                // submission: await scrapeSpideyFetching.fetchGfgUserSubmissionData(profileLinks.gfgUsername),
            } : null,
            codechef : profileLinks.codechefUsername ? {
                profile : await scrapeSpideyFetching.fetchCodeChefUserData(profileLinks.codechefUsername),
                submission : await scrapeSpideyFetching.fetchCodeChefUserSubmissionData(profileLinks.codechefUsername),
            } : null,
            interviewbit : profileLinks.interviewbitUsername ? {
                profile : await scrapeSpideyFetching.fetchInterviewbitUserData(profileLinks.interviewbitUsername),
            } : null,
            leetcode : profileLinks.leetCodeUsername ? {
                profile : await leetcodeFetching.getLeetCodeProfileInfo(profileLinks.leetCodeUsername),
                badges : await leetcodeFetching.getLeetCodeBadges(profileLinks.leetCodeUsername),
                contest : await leetcodeFetching.getLeetCodeContestData(profileLinks.leetCodeUsername),
                problems : await leetcodeFetching.getLeetCodeProblemsCount(profileLinks.leetCodeUsername),
                submission : await leetcodeFetching.getLeetCodeUserStreaksAndCalendar(profileLinks.leetCodeUsername, new Date().getFullYear()),
            } : null,
            github : profileLinks.githubUsername ? {
                profile : await githubFetching.getUserProfileData(profileLinks.githubUsername),
                contributions : await githubFetching.getContributionCount(profileLinks.githubUsername),
                commits : await githubFetching.getLastYearCommitsCount(profileLinks.githubUsername),
                calendar : await githubFetching.getContributionCalendar(profileLinks.githubUsername),
                badges: await githubFetching.getGithubContributionBadges(profileLinks.githubUsername),
                languageStats : await githubFetching.getUserLanguageStats(profileLinks.githubUsername)
            } : null
        }

        return res.status(200).json(profileData);

    } catch (error) {
        console.log("Error occurred while fetching user profiles data:", error.message);
        console.log(error.stack);
        return res.status(500).json({"message" : "Couldn't fetch user profiles data."});
    }
}


export {
    getProfiles,
    updateProfiles,
    fetchProfilesData,
}