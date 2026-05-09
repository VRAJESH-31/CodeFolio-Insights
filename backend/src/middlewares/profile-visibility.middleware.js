import UserModel from "../models/user.model.js";
import asyncHandler from '../utils/async-handler.util.js';
import ApiError from "../utils/api-error.util.js";

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
        throw new ApiError(403, "Not specified which user info is required");
    }

    if (!profileUser) {
        throw new ApiError(404, "Invalid user demanded!");
    }

    const isOwner = viewerUser && profileUser._id.equals(viewerUser._id);
    const isAdmin = viewerUser && viewerUser.isAdmin;
    const isPublic = profileUser.profileVisibility;

    if (!isPublic && !isOwner && !isAdmin) {
        throw new ApiError(403, "This profile is private.");
    }

    next();
});

export {
    checkProfileVisibility,
}