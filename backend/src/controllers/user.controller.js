import UserModel from "../models/user.model.js";
import mongoose from "mongoose";
import { destroyFile, uploadFile } from "../utils/cloudinary.js";
import bcrypt from "bcrypt";
import { getSearchQuery, getSortQuery } from "../utils/query/userQuery.js"
import handleError from '../utils/handleError.js';

const getUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) return res.status(200).json({ message: "User id is required!" });
        if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ message: "Invalid user ID format." });

        const queriedUser = await UserModel.findById(userId).select("-googleId -password -__v");
        if (!queriedUser) return res.status(404).json({ message: "Invalid user id!" });;

        return res.status(200).json(queriedUser);
    } catch (error) {
        return handleError(res, error, "Something went wrong!");
    }
}

const getUsers = async (req, res) => {
    try {
        const isAdmin = req.isAdmin;
        const limit = Math.min(req.query.limit || 10, 100);
        const searchQuery = req.query.searchQuery || "";
        const searchField = req.query.searchField;
        const searchOrder = parseInt(req.query.searchOrder) || 0;
        let cursor = null;
        let query = {};
        let fieldQuery = {};
        let sortQuery = {};

        if (!isAdmin) return res.status(403).json({ message: "You are not authorized to access this service." });
        if (searchOrder !== 1 && searchOrder !== -1) return res.status(400).json({ message: "The value of search order should be 1 or -1 only!" });

        if (req.query.cursor) {
            try {
                cursor = JSON.parse(decodeURIComponent(req.query.cursor));
            } catch (error) {
                return res.status(400).json({ message: "Invalid cursor format" });
            }
        }

        if (searchField == "createdAt") sortQuery = getSortQuery("createdAt", searchOrder);
        else if (searchField == "updatedAt") sortQuery = getSortQuery("updatedAt", searchOrder);
        else if (searchField == "name") sortQuery = getSortQuery("name", searchOrder);
        else if (searchField == "profileViews") sortQuery = getSortQuery("profileViews", searchOrder);

        if (cursor) {

            if (searchField == "createdAt") fieldQuery = getSearchQuery("createdAt", searchOrder, cursor);
            else if (searchField == "updatedAt") fieldQuery = getSearchQuery("updatedAt", searchOrder, cursor);
            else if (searchField == "name") fieldQuery = getSearchQuery("name", searchOrder, cursor);
            else if (searchField == "profileViews") fieldQuery = getSearchQuery("profileViews", searchOrder, cursor);

            query = {
                $and: [
                    fieldQuery,
                    { name: { $regex: searchQuery, $options: 'i' } }
                ]
            };
        } else {
            query = {
                name: { $regex: searchQuery, $options: 'i' }
            }
        }

        const users = await UserModel.find(query).sort(sortQuery).limit(limit + 1);
        const hasNext = users.length > limit;
        const pageUsers = hasNext ? users.slice(0, limit) : users;
        const nextCursor = hasNext ? pageUsers[pageUsers.length - 1] : null;

        res.status(200).json({
            users: pageUsers,
            nextCursor: nextCursor ? encodeURIComponent(JSON.stringify(nextCursor)) : null,
            hasNext
        });

    } catch (error) {
        return handleError(res, error, "Could not fetch users");
    }
}

const updateUserInfo = async (req, res) => {
    try {
        const user = req.user;
        const { name, ...updatedFields } = req.body;
        const file = req.file;

        const userId = user._id;

        const queriedUser = await UserModel.findById(userId).select("-googleId -password -__v");
        if (!queriedUser) return res.status(404).json({ message: "Invalid user id!" });

        // Checking if the user with name provided in the updatedField is already present or not
        if (name) {
            const existingUser = await UserModel.findOne({ name });
            if (existingUser && !existingUser._id.equals(user._id)) return res.status(400).json({ message: "User with given name already exists" });
            queriedUser.name = name;
            queriedUser.save();
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $set: updatedFields },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedUser) return res.status(500).json({ message: "Could not update the user info" });

        console.log(file);

        if (file) {
            const previousProfileImageUrl = updatedUser.profile;
            const newProfileImageUrl = await uploadFile(file.path, "Codefolio/Profiles");

            console.log(newProfileImageUrl);

            if (newProfileImageUrl) {
                if (previousProfileImageUrl) await destroyFile(previousProfileImageUrl, "Codefolio/Profiles");
                updatedUser.profile = newProfileImageUrl;
                updatedUser.save();
            } else {
                return res.status(500).json({ message: "Couldn't upload new profile image!" });
            }
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        return handleError(res, error, "Something went wrong!");
    }
}

const changePassword = async (req, res) => {
    try {
        const user = req.user;
        const { oldPassword, newPassword } = req.body;

        if (oldPassword === newPassword) return res.status(400).json({ message: "old and new password are same" });

        const queriedUser = await UserModel.findById(user._id);
        if (!queriedUser) return res.status(404).json({ message: "User not found!" });

        if (queriedUser.password) {
            if (await bcrypt.compare(oldPassword, queriedUser.password)) {
                queriedUser.password = await bcrypt.hash(newPassword, await bcrypt.genSalt(10));
                queriedUser.save();
                return res.status(200).json({ message: "Password Changed" });
            } else {
                return res.status(400).json({ message: "Wrong password!" });
            }
        } else {
            return res.status(400).json({ message: "You are logged in through third party login services, and not general password login" });
        }
    } catch (error) {
        return handleError(res, error, "Could not change password");
    }
}

const addProfileView = async (req, res) => {
    const user = req.user;
    const userId = req.params.userId;

    const loggedInUserId = user._id;

    if (loggedInUserId.equals(new mongoose.Types.ObjectId(userId))) {
        return res.status(403).json({ message: "Cannot increase profile view count for the user itself" });
    } else {
        const user = await UserModel.findByIdAndUpdate(
            userId,
            { $inc: { profileViews: 1 } },
            { new: true },
        )

        if (!user) return res.status(404).json({ message: "User not found!" });
        else return res.status(200).json({ message: "Profile view count updated!", profileViews: user.profileViews });
    }
}

const updateLastRefresh = async (req, res) => {
    try {
        const user = req.user;
        user.lastRefresh = Date.now();
        user.save();
        return res.status(200).json({ message: "refresh successful" });
    } catch (error) {
        return handleError(res, error, "Could not refresh");
    }
}

export {
    getUser,
    getUsers,
    updateUserInfo,
    updateLastRefresh,
    changePassword,
    addProfileView,
}