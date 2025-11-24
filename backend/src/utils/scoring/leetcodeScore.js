// Natural logarithm (ln) is Math.log()

const getProblemsSolvedCountScore = (problemsCount) => {

    const totalProblemsSolved = problemsCount["acSubmissionNum"][0]["count"];
    const easyProblemsSolved = problemsCount["acSubmissionNum"][1]["count"];
    const mediumProblemsSolved = problemsCount["acSubmissionNum"][2]["count"];
    const hardProblemsSolved = problemsCount["acSubmissionNum"][3]["count"];

    // 1. Base coding score (Kept Linear weighted for difficulty)
    const codingScore = easyProblemsSolved * 2 + mediumProblemsSolved * 4 + hardProblemsSolved * 8;
    
    // 2. Ratio scores (Kept Linear/Ratio)
    // Avoid division by zero if totalProblemsSolved is 0
    const mediumProblemsRatioScore = (totalProblemsSolved === 0) 
        ? 0 
        : Math.min(100, (mediumProblemsSolved / (0.5 * totalProblemsSolved)) * 100);
        
    const hardProblemsRatioScore = (totalProblemsSolved === 0) 
        ? 0 
        : Math.min(100, (hardProblemsSolved / (0.3 * totalProblemsSolved)) * 100);

    // 3. Final Score Combination with Cubic Root Scaling on the main component
    // Logarithmic/Non-linear scaling: Math.cbrt is the cube root function
    const scaledCodingScore = Math.min(100, Math.cbrt(codingScore) * 25); 

    // Final score weights remain the same
    const score = scaledCodingScore * 0.7 + mediumProblemsRatioScore * 0.2 + hardProblemsRatioScore * 0.1;

    return Math.min(100, score);
}

const getAcceptanceRateScore = (acceptanceRate) => {
    // Acceptance rate is already a ratio (0-100), so linear is appropriate.
    return acceptanceRate;
}

const getContestPerformanceScore = (contestData) => {

    if (!contestData) return 0;

    // Logarithmic Scaling for Contest Count (ln)
    // Formula: 40 * ln(C+1) -> Needs ~22 attended contests to hit 100
    const contestCountScore = Math.min(100, 40 * Math.log(contestData["attendedContestsCount"] + 1));
    
    // Contest Rating is relative to elite performance, so linear is appropriate.
    const contestRatingScore = 100 - Math.floor(contestData["topPercentage"]);
    
    const score = contestCountScore * 0.2 + contestRatingScore * 0.8

    return Math.min(100, score);
}

const getSubmissionConsistencyScore = (submissionCalendarData) => {

    // Logarithmic Scaling for Streak (ln)
    // Formula: 40 * ln(C+1) -> Makes long streaks difficult to improve score
    const streakScore = Math.min(100, 40 * Math.log(submissionCalendarData["streak"] + 1));
    
    // Logarithmic Scaling for Active Days (ln)
    // Formula: 25 * ln(C+1) -> Heavily rewards first year, slows down significantly after
    const submissionScore = Math.min(100, 25 * Math.log(submissionCalendarData["totalActiveDays"] + 1));
    
    const score = streakScore * 0.3 + submissionScore * 0.7;

    return Math.min(100, score);
}

const getBadgesScore = (badgesData) => {
    // Kept Linear: Badges are a discrete achievement metric.
    let score = Math.min(badgesData["badges"].length * 10, 100);
    if (badgesData["contestBadge"]) score = score + 50; // Bonus for a contest-related badge

    return Math.min(100, score);
}

const getTopicWiseProblemsScore = (topicWiseProblemsData) => {
    // Kept Linear/Ratio: Focuses on distribution of skill across topics, not volume.
    const advancedProblemsCount = topicWiseProblemsData["advanced"].reduce((problemsCount, topicProblemsSolved) => problemsCount + topicProblemsSolved["problemsSolved"], 0);
    const intermediateProblemsCount = topicWiseProblemsData["intermediate"].reduce((problemsCount, topicProblemsSolved) => problemsCount + topicProblemsSolved["problemsSolved"], 0);
    const fundamentalProblemsCount = topicWiseProblemsData["fundamental"].reduce((problemsCount, topicProblemsSolved) => problemsCount + topicProblemsSolved["problemsSolved"], 0);
    const totalProblemsCount = advancedProblemsCount + intermediateProblemsCount + fundamentalProblemsCount;

    // Avoid division by zero
    if (totalProblemsCount === 0) return 0;

    const advancedProblemsCountScore = Math.min(100, (advancedProblemsCount / totalProblemsCount) * 200); // Scaled up to give impact
    const intermediateProblemsCountScore = Math.min(100, (intermediateProblemsCount / totalProblemsCount) * 200); // Scaled up to give impact
    
    // New Scaling: The *2 was removed and the weights adjusted to make it harder to max out.
    const score = advancedProblemsCountScore * 0.6 + intermediateProblemsCountScore * 0.4;

    return Math.min(100, score);
}

const getProfileDataScore = (profileData) => {
    // Kept Linear/Binary: Simple profile completion metric.
    let score = 0;
    let categories = ["realName", "websites", "skillTags", "aboutMe"];

    for (let i = 0; i < categories.length; i++) {
        // Checking for a non-empty string or array (length > 0)
        if (profileData[categories[i]] && profileData[categories[i]].length > 0) {
            score = score + 100 / categories.length;
        }
    }

    return Math.min(100, score);
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