import UserModel from "../models/user.model.js";
import asyncHandler from '../utils/async-handler.util.js';

const checkProfileVisibility = asyncHandler(async (req, res, next) => {
    const viewerUser = req.user || null;
    const displayName = req.query.displayName || req.params.displayName;
    const userId = req.query.userId || req.params.userId;
    let profileUser;

    if (userId) {
        profileUser = await UserModel.findById(userId);
    } else if (displayName) {
        profileUser = await UserModel.findOne({ displayName });
    } else {
        return res.status(403).json({ message: "Not specified which user info is required" });
    }

    if (!profileUser) {
        return res.status(404).json({ message: "Invalid user demanded!" });
    }

    const isOwner = viewerUser && profileUser._id.equals(viewerUser._id);
    const isAdmin = viewerUser && viewerUser.isAdmin;
    const isPublic = profileUser.profileVisibility;

    if (!isPublic && !isOwner && !isAdmin) {
        return res.status(403).json({ message: "This profile is private." });
    }

    next();
});

export {
    checkProfileVisibility,
}