const getProblemsSolvedCountScore = (problemsCount) => {

    const totalProblemsSolved = problemsCount["acSubmissionNum"][0]["count"];
    const easyProblemsSolved = problemsCount["acSubmissionNum"][1]["count"];
    const mediumProblemsSolved = problemsCount["acSubmissionNum"][2]["count"];
    const hardProblemsSolved = problemsCount["acSubmissionNum"][3]["count"];

    const codingScore = easyProblemsSolved*2 + mediumProblemsSolved*4 + hardProblemsSolved*8;
    const mediumProblemsRatioScore = Math.min(100, (mediumProblemsSolved/(0.5*totalProblemsSolved))*100);
    const hardProblemsRatioScore = Math.min(100, (hardProblemsSolved/(0.3*totalProblemsSolved))*100);

    const score = Math.min(100, codingScore/25)*0.7 + mediumProblemsRatioScore*0.2 + hardProblemsRatioScore*0.1;

    return score;
}

const getAcceptanceRateScore = (acceptanceRate) => {
    return acceptanceRate;
}

const getContestPerformanceScore = (contestData) => {

    if (!contestData) return 0;

    const contestCountScore = Math.min(100, contestData["attendedContestsCount"]*4);
    const contestRatingScore = 100 - Math.floor(contestData["topPercentage"]);
    const score = contestCountScore*0.2 + contestRatingScore*0.8

    return score;
}

const getSubmissionConsistencyScore = (submissionCalendarData) => {

    const streakScore = Math.min(100, submissionCalendarData["streak"]);
    const submissionScore = Math.min(100, (submissionCalendarData["totalActiveDays"]/365)*100);
    const score = streakScore*0.3 + submissionScore*0.7;

    return score;
}

const getBadgesScore = (badgesData) => {

    let score = Math.min(badgesData["badges"].length*10, 100);
    if (badgesData["contestBadge"]) score = score + 50;

    return Math.min(100, score);
}

const getTopicWiseProblemsScore = (topicWiseProblemsData) => {

    const advancedProblemsCount = topicWiseProblemsData["advanced"].reduce((problemsCount, topicProblemsSolved)=>problemsCount + topicProblemsSolved["problemsSolved"], 0);
    const intermediateProblemsCount = topicWiseProblemsData["intermediate"].reduce((problemsCount, topicProblemsSolved)=>problemsCount + topicProblemsSolved["problemsSolved"], 0);
    const fundamentalProblemsCount = topicWiseProblemsData["fundamental"].reduce((problemsCount, topicProblemsSolved)=>problemsCount + topicProblemsSolved["problemsSolved"], 0);
    const totalProblemsCount = advancedProblemsCount + intermediateProblemsCount + fundamentalProblemsCount;

    const advancedProblemsCountScore = Math.min(100, (advancedProblemsCount/totalProblemsCount)*2);
    const intermediateProblemsCountScore = Math.min(100, (intermediateProblemsCount/totalProblemsCount)*2);
    const score = Math.min(100, (advancedProblemsCountScore*0.6 + intermediateProblemsCountScore*0.4)*2);

    return score;
}

const getProfileDataScore = (profileData) => {

    let score = 0;
    let categories = ["realName", "websites", "skillTags", "aboutMe"];

    for (let i=0; i<categories.length; i++){
        if (profileData[categories[i]].length > 0) score = score + 100/categories.length;
    }

    return score;
}

export {
    getProblemsSolvedCountScore,
    getAcceptanceRateScore,
    getContestPerformanceScore,
    getSubmissionConsistencyScore,
    getBadgesScore,
    getTopicWiseProblemsScore,
    getProfileDataScore,
}