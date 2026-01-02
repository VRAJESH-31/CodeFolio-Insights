import scoreModel from "../models/score.model.js";

const getScoreComparison = async (score, platform) => {

    const equalOrLesserScore = await scoreModel.find({platform, score: { $lte: score }})
    const greaterScores = await scoreModel.find({platform, score: { $gt: score }});

    if (!greaterScores || !equalOrLesserScore) return null;

    const scoreComparison = {
        equalOrLesserEntries: equalOrLesserScore.length,
        greaterEntries: greaterScores.length,
    }

    return scoreComparison;
}

const savePlatformScore = async (score, platform, username) => {
    try {
        const existingScore = await scoreModel.findOne({ platform, username });
        if (existingScore) await existingScore.updateOne({ $set: { score } });
        else await scoreModel.create({ score, platform, username });
    } catch (error) {
        console.log(error);
        console.log(error.stack);
    }
}

export {
    getScoreComparison,
    savePlatformScore,
}