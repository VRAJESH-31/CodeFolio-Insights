import ProfileModel from '../models/profiles.model.js';
import mongoose from 'mongoose';

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

export {
    getProfiles,
    updateProfiles,
}