import UserModel from '../models/user.model.js';
import ProfileModel from '../models/profiles.model.js';
import mongoose from 'mongoose';
import axios from 'axios';
import { getLeetCodeBadges, getLeetCodeContestData, getLeetCodeProblemsCount, getLeetCodeProfileInfo, getLeetCodeUserStreaksAndCalendar } from '../utils/leetcodeFetch.js';
import { fetchCodeChefUserData, fetchCodeChefUserSubmissionData, fetchGfgUserData, fetchGfgUserSubmissionData, fetchInterviewbitUserData } from '../utils/scrapeSpideyFetch.js';
import { getContributionCalendar, getContributionCount, getGithubContributionBadges, getLastYearCommitsCount, getUserLanguageStats, getUserProfileData } from '../utils/githubFetch.js';

const getProfiles = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) return res.status(400).json({ message: "user ID not provided." });
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
        const { userId } = req.body;
        const updateFields = req.body;

        if (!userId) return res.status(400).json({ message: "User ID is required to update a profile." });
        
        let $setFields = { ...updateFields };
        delete $setFields.userId; // Ensure userId isn't updated if it exists

        const updatedProfile = await ProfileModel.findOneAndUpdate(
            { userId: userId }, // Filter by the user's ID
            { $set: $setFields }, // Apply all other fields from the body
            { new: true, runValidators: true, upsert: true } // Return the updated document and run Mongoose validators
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
        const username = req.query.username;
        if (!username || !username.trim()) return res.status(400).json({message: "username not provided"});

        const user = await UserModel.findOne({name: username});
        if (!user) return res.status(404).json({message: "Invalid Username!"});

        const profilesLinksUrl = `${req.protocol}://${req.get("host")}/profiles?userId=${user._id}`
        const profileLinksResponse = await axios.get(profilesLinksUrl);
        const profileLinks = profileLinksResponse.data;

        const profileData = {
            gfg : profileLinks.gfgUsername ? {
                profile : await fetchGfgUserData(profileLinks.gfgUsername),
                submission : await fetchGfgUserSubmissionData(profileLinks.gfgUsername),
            } : null,
            codechef : profileLinks.codechefUsername ? {
                profile : await fetchCodeChefUserData(profileLinks.codechefUsername),
                submission : await fetchCodeChefUserSubmissionData(profileLinks.codechefUsername),
            } : null,
            interviewbit : profileLinks.interviewbitUsername ? {
                profile : await fetchInterviewbitUserData(profileLinks.interviewbitUsername),
            } : null,
            leetcode : profileLinks.leetCodeUsername ? {
                profile : await getLeetCodeProfileInfo(profileLinks.leetCodeUsername),
                badges : await getLeetCodeBadges(profileLinks.leetCodeUsername),
                contest : await getLeetCodeContestData(profileLinks.leetCodeUsername),
                problems : await getLeetCodeProblemsCount(profileLinks.leetCodeUsername),
                submission : await getLeetCodeUserStreaksAndCalendar(profileLinks.leetCodeUsername),
            } : null,
            github : profileLinks.githubUsername ? {
                profile : await getUserProfileData(profileLinks.githubUsername),
                contributions : await getContributionCount(profileLinks.githubUsername),
                commits : await getLastYearCommitsCount(profileLinks.githubUsername),
                calendar : await getContributionCalendar(profileLinks.githubUsername),
                badges: await getGithubContributionBadges(profileLinks.githubUsername),
                languageStats : await getUserLanguageStats(profileLinks.githubUsername)
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