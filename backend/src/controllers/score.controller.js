import scoreModel from "../models/score.model.js";
import asyncHandler from '../utils/asyncHandler.js';

const getUserScoreHistory = asyncHandler(async (req, res) => {
    const user = req.user;
    const { platform, last, username } = req.query;

    let scoreHistory;
    if (platform == "Leetcode" || platform == "Github") {
        if (!username || !username.trim()) return res.status(400).json({ message: "username not provided" });
        scoreHistory = await scoreModel.find({
            username,
            platform,
        }).sort({ createdAt: -1 }).limit(last);
    } else {
        if (!user) return res.status(401).json({ message: "You are not authenticated!" });
        scoreHistory = await scoreModel.find({
            userId: user._id,
            platform,
        }).sort({ createdAt: -1 }).limit(last);
    }

    if (!scoreHistory) return res.status(500).json({ message: "Could not get score history" });

    return res.status(200).json(scoreHistory);
});

export {
    getUserScoreHistory,
}
