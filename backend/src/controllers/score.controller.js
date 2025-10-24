import scoreModel from "../models/score.model.js";

const saveScore = async (req, res) => {
    try {
        const user = req.user;
        const {score, platform} = req.body;
        
        const userId = user?._id;

        if (!score || !platform) return res.status(400).json({message: "score and platform both are required!"});

        const newScore = await scoreModel.create({
            userId,
            score,
            platform
        })

        if (!newScore) return res.status(500).json({message: "Could not save this resume score entry"});
        return res.status(201).json({message: "Resume score saved!"});
    } catch (error) {
        console.log("Error occurred while saving score:", error.message);
        console.log(error.stack);
        return res.status(500).json({message: "Could not save this resume score entry"});
    }
}

const getPlatformScoreStats = async (req, res) => {
    try {
        const {score, platform} = req.query;
        if (!score || !platform) return res.status(400).json({message: "score and platform both are required!"});

        const equalOrLesserScore = await scoreModel.find({
            platform,
            score : {$lte : score}
        })

        const greaterScores = await scoreModel.find({
            platform,
            score : {$gt: score}
        });

        if (!greaterScores || !equalOrLesserScore) return res.status(500).json({message: "Could not get score stats"});

        const response = {
            equalOrLesserEntries : equalOrLesserScore.length,
            greaterEntries: greaterScores.length,
        }

        return res.status(200).json(response);
    } catch (error) {
        console.log("Error occurred while getting score stats:", error.message);
        console.log(error.stack);
        return res.status(500).json({message: "Could not get score stats"});
    }
}

const getUserScoreHistory = async (req, res) => {
    try {
        const user = req.user;
        const {platform, last, username} = req.query;

        const userId = user?._id;
        if (!last) last = 10;

        if (!platform) return res.status(400).json({message: "platform is required!"});
        if (last > 100) return res.status(400).json({message: "You cannot access more than 100 scores"});

        let scoreHistory;
        if (platform=="Leetcode" || platform=="Github"){
            if (!username || !username.trim()) return res.status(400).json({message: "username not provided"});
            scoreHistory = await scoreModel.find({
                username,
                platform,
            }).sort({createdAt: -1}).limit(last);
        } else {
            if (!user) return res.status(401).json({message: "You are not authenticated!"});
            scoreHistory = await scoreModel.find({
                userId,
                platform,
            }).sort({createdAt: -1}).limit(last);
        }

        if (!scoreHistory) return res.status(500).json({message: "Could not get score history"});

        return res.status(200).json(scoreHistory);
    } catch (error) {
        console.log("Error occurred while getting score stats:", error.message);
        console.log(error.stack);
        return res.status(500).json({message: "Could not get score stats"});
    }
}

export {
    getPlatformScoreStats,
    getUserScoreHistory,
    saveScore,
}