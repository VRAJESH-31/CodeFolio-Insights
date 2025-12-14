import UserModel from "../models/user.model";
import handleError from '../utils/handleError.js';

const checkProfileVisibility = async (req, res, next) => {
    try {
        const profileName = req.query.username;
        const profileId = req.query.userId;
        const userId = req.user._id || null;
        let profileUser;

        if (!profileId && !profileName) {
            return res.status(403).json({ message: "Not specified which user info is required" });
        } else if (!profileId) {
            profileUser = await UserModel.findOne({ name: profileName });
        } else if (!profileName) {
            profileUser = await UserModel.findById(profileId);
        }

        if (!profileUser) {
            return res.status(404).json({ message: "Invalid user demanded!" });
        } else if (!profileUser.publicVisibility && profileUser._id !== userId) {
            return res.status(403).json({ message: "Invalid user demanded" });
        }

        next();
    } catch (error) {
        return handleError(res, error, "Internal Server Error!");
    }
}

export {
    checkProfileVisibility,
}