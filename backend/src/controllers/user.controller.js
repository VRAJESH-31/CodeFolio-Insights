import UserModel from "../models/user.model.js";
import mongoose from "mongoose";
import { destroyFile, uploadFile } from "../utils/cloudinary.js";
import bcrypt from "bcrypt";

const getUser = async (req, res) => {
    try {
        const userId = req.query.id;

        if (!userId) return res.status(200).json({message: "User id is required!"});
        if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ message: "Invalid user ID format." });

        const queriedUser = await UserModel.findById(userId).select("-googleId -password -__v");
        if (!queriedUser) return res.status(404).json({message: "Invalid user id!"});;

        return res.status(200).json(queriedUser);
    } catch (error){
        console.log("Failed to fetch user:", error.message);
        console.log(error.stack);
        return res.status(500).json({message: "Something went wrong!"});
    }
}

const updateUserInfo = async (req, res) => {
    try {
        const user = req.user;
        const {bio, profileVisibility, name} = req.body;
        const file = req.file;

        const userId = user._id;

        const queriedUser = await UserModel.findById(userId).select("-googleId -password -__v");
        if (!queriedUser) return res.status(404).json({message: "Invalid user id!"});

        const existingUser = await UserModel.findOne({name});
        if (existingUser && !existingUser._id.equals(user._id)) return res.status(400).json({message: "User with given name already exists"});

        if (name) queriedUser.name = name;
        if (bio) queriedUser.bio = bio;
        if (profileVisibility) queriedUser.profileVisibility = profileVisibility;
        queriedUser.save();

        if (file){
            const previousProfileImageUrl = queriedUser.profile;
            const newProfileImageUrl = await uploadFile(file.path, "Codefolio");

            if (newProfileImageUrl){
                if (previousProfileImageUrl) destroyFile(previousProfileImageUrl);
                queriedUser.profile = newProfileImageUrl;
                queriedUser.save();
            } else {
                return res.status(500).json({message: "Couldn't upload new profile image!"});
            }
        }

        return res.status(200).json(queriedUser);
    } catch (error){
        console.log("Failed to fetch user:", error.message);
        console.log(error.stack);
        return res.status(500).json({message: "Something went wrong!"});
    }
}

const changePassword = async (req, res) => {
    try {
        const user = req.user;
        const {password} = req.body;

        const queriedUser = await UserModel.findById(user._id);
        if (!queriedUser) return res.status(404).json({message: "User not found!"});

        if (queriedUser.password){
            if (await bcrypt.compare(password, queriedUser.password)){
                return res.status(400).json({message: "Your new password is same as old password!"});
            } else {
                queriedUser.password = await bcrypt.hash(password, await bcrypt.genSalt(10));
                queriedUser.save(); 
                return res.status(200).json({message: "Password Changed"});
            }
        } else {
            return res.status(400).json({message: "You are logged in through third party login services, and not general password login"});
        }
    } catch (error){
        console.log("Error occurred changing password:", error.message);
        console.log(error.stack);
        return res.json().status({message: "Could not change password"});
    }
}

const addProfileView = async (req, res) => {
    const user = req.user;
    const userId = req.query.userId;

    const loggedInUserId = user._id;

    if (loggedInUserId.equals(new mongoose.Types.ObjectId(userId))){
        return res.status(403).json({message: "Cannot increase profile view count for the user itself"});
    } else {
        const user = await UserModel.findByIdAndUpdate(
            userId,
            {$inc : {profileViews: 1}},
            {new : true},
        )

        if (!user) return res.status(404).json({message: "User not found!"});
        else return res.status(200).json({message: "Profile view count updated!", profileViews : user.profileViews});
    }
}

const updateLastRefresh = async (req, res) => {
    try {
        const user = req.user;
        user.lastRefresh = Date.now();
        user.save();
        return res.status(200).json({message: "refresh successful"});
    } catch (error){
        console.log("Error Occurred during refreshing user:", error.message);
        console.log(error.stack);
        return res.json().status({message: "Could not refresh"});
    }
}

export {
    getUser,
    updateUserInfo,
    updateLastRefresh,
    changePassword,
    addProfileView,
}