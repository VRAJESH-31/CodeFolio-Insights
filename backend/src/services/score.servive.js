import scoreModel from "../models/score.model.js";

const getScoreComparison = async (score, platform) => {
    try {
        const equalOrLesserScore = await scoreModel.find({platform, score: { $lte: score }})
        const greaterScores = await scoreModel.find({platform, score: { $gt: score }});

        if (!greaterScores || !equalOrLesserScore) return null;

        const scoreComparison = {
            equalOrLesserEntries: equalOrLesserScore.length,
            greaterEntries: greaterScores.length,
        }

        return scoreComparison;
    } catch (error) {
        console.log("Error occurred while getting score comparison:", error);
        console.log(error.stack);
        return null;
    }
}

const savePlatformScore = async (score, platform, username) => {
    try {
        const existingScore = await scoreModel.findOne({ platform, username });
        if (existingScore){
            await existingScore.updateOne({ $set: { score } });
            return existingScore;
        } else {
            const newScore = await scoreModel.create({ score, platform, username });
            return newScore;
        }
    } catch (error) {
        console.log("Error occurred while saving platform score:", error);
        console.log(error.stack);
        return null;
    }
}

export {
    getScoreComparison,
    savePlatformScore,
}