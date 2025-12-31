import scoreModel from "../models/score.model.js";
import asyncHandler from '../utils/asyncHandler.js';

const saveScore = asyncHandler(async (req, res) => {
    const user = req.user;
    const { score, platform } = req.body;

    const userId = user?._id;

    const newScore = await scoreModel.create({
        userId,
        score,
        platform
    })

    if (!newScore) return res.status(500).json({ message: "Could not save this resume score entry" });
    return res.status(201).json({ message: "Resume score saved!" });
});

const getPlatformScoreStats = asyncHandler(async (req, res) => {
    const { score, platform } = req.query;

    const equalOrLesserScore = await scoreModel.find({
        platform,
        score: { $lte: score }
    })

    const greaterScores = await scoreModel.find({
        platform,
        score: { $gt: score }
    });

    if (!greaterScores || !equalOrLesserScore) return res.status(500).json({ message: "Could not get score stats" });

    const response = {
        equalOrLesserEntries: equalOrLesserScore.length,
        greaterEntries: greaterScores.length,
    }

    return res.status(200).json(response);
});

const getUserScoreHistory = asyncHandler(async (req, res) => {
    const user = req.user;
    const { platform, last, username } = req.query;

    const userId = user?._id;

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
            userId,
            platform,
        }).sort({ createdAt: -1 }).limit(last);
    }

    if (!scoreHistory) return res.status(500).json({ message: "Could not get score history" });

    return res.status(200).json(scoreHistory);
});

export {
    getPlatformScoreStats,
    getUserScoreHistory,
    saveScore,
}
