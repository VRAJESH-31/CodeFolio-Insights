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

export {
    getScoreComparison,
}