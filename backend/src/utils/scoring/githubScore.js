// The base of the natural logarithm (e) is Math.E in JavaScript
// The natural logarithm (ln) is Math.log()
// The logarithm to base 10 (log10) is Math.log10()

// Total commits limit remains relevant for the commits quality function
import { TOTAL_COMMITS_LIMIT } from "../fetching/githubFetch.js";

const getRepoCountScore = (repoCount) => {
    // Logarithmic: Harder to max out, maxes around 50 repos (log10(51) is approx 1.7)
    // Scale: 100 * log10(C+1) / 2 
    const value = 100 * (Math.log10(repoCount + 1) / 2);
    return Math.min(100, value);
}

const getFollowersCountScore = (followersCount) => {
    // Combination of Logarithmic (ln) and Square Root for strong non-linear growth
    // Formula: 20 * ln(C+1) + 10 * sqrt(C)
    const value = 20 * Math.log(followersCount + 1) + 10 * Math.sqrt(followersCount);
    return Math.min(100, value);
}

const getFollowingRatioScore = (followersCount, followingCount) => {
    // Kept mostly Linear/Ratio based, as the ratio itself is a strong indicator
    let value;
    if (followingCount == 0) value = getFollowersCountScore(followersCount);
    else value = Math.min(followersCount / followingCount, 1) * 100;
    return value;
}

const getLanguagesCountScore = (languagesCount) => {
    // Combination of Linear and Logarithmic (log10) for diminishing returns on language hopping
    // Formula: 10 * C + 20 * log10(C+1)
    const value = 10 * languagesCount + 10 * Math.log10(languagesCount + 1);
    return Math.min(100, value);
}

const getStarsCountScore = (starsCount) => {
    // Highly Logarithmic (ln) to reward repos that are heavily forked
    // Formula: 40 * log10(C+1)
    const value = 40 * Math.log10(starsCount + 1);
    return Math.min(100, value);
}

const getForksCountScore = (forksCount) => {
    // Highly Logarithmic (ln) to reward repos that are heavily forked
    // Formula: 50 * ln(C+1)
    const value = 40 * Math.log(forksCount + 1);
    return Math.min(100, value);
}

const getTotalCommitsScore = (totalCommits) => {
    // Uses a smooth Sigmoid-like function (1 - e^(-C/k)) which grows fast initially but gradually approaches 100
    // Maxes near 100 with diminishing returns (k=250 is the rate constant)
    const value = 100 * (1 - Math.exp(-totalCommits / 250));
    return Math.min(100, value);
}

const getPullRequestsCountScore = (totalPullRequests) => {
    // Uses a smooth Sigmoid-like function (1 - e^(-C/k)) which grows fast initially but gradually approaches 100
    // Maxes near 100 with diminishing returns (k=50 is the rate constant)
    const value = 100 * (1 - Math.exp(-totalPullRequests / 50));
    return Math.min(100, value);
}

const getIssuesCountScore = (issuesCount) => {
    // Uses a smooth Sigmoid-like function (1 - e^(-C/k)) which grows fast initially but gradually approaches 100
    // Maxes near 100 with diminishing returns (k=25 is the rate constant)
    const value = 100 * (1 - Math.exp(-issuesCount / 25));
    return Math.min(100, value);
}

const getRestrictedContributionCountScore = (restrictedContributionCount) => {
    // Uses a smooth Sigmoid-like function (1 - e^(-C/k)) which grows fast initially but gradually approaches 100
    // Maxes near 100 with diminishing returns (k=250 is the rate constant)
    const value = 100 * (1 - Math.exp(-restrictedContributionCount / 250));
    return Math.min(100, value);
}

const getProfileReadmeScore = (profileReadme) => {
    if (!profileReadme) return 0;
    return 100;
}

const getPinnedReposScore = (pinnedRepos) => {
    let score = 0;

    for (let i = 0; i < pinnedRepos.length; i++) {
        const pinnedRepo = pinnedRepos[i];
        let pinnedRepoScore = 50;
        
        if (pinnedRepo.readmeFile) pinnedRepoScore = pinnedRepoScore + 30;
        if (pinnedRepo.description) pinnedRepoScore = pinnedRepoScore + 5;
        if (pinnedRepo.license) pinnedRepoScore = pinnedRepoScore + 10;
        if (pinnedRepo.repositoryTopics?.nodes) pinnedRepoScore = pinnedRepoScore + (Math.min(pinnedRepo.repositoryTopics?.nodes.length, 10))/2;

        score += pinnedRepoScore/6;
    }

    return Math.min(100, score);
}

const getStreakScore = (maxStreak, currentStreak, activeDays) => {
    // Focuses on long-term commitment (Max Streak and Active Days) using Logarithmic (log10)
    // Formula: 50 * log10(MaxStreak+1)/2 + 50 * log10(ActiveDays+1)/3
    // Note: Current Streak is less weighted as it's volatile.
    const maxStreakWeight = 45 * Math.log10(maxStreak + 1);
    const activeDaysWeight = 37.5 * Math.log10(activeDays + 1);
    
    // Add a small linear component for current streak, capped at 10 points
    const currentStreakWeight = 50 * Math.log10(currentStreak + 1);

    const value = activeDaysWeight*0.7 + maxStreakWeight*0.2 + currentStreakWeight*0.1;
    return Math.min(100, value);
}

const getCommitsQualityScore = (commitsQualityReport) => {
    // This is often a ratio-based metric, so keeping the linear scaling seems appropriate.
    // It is effectively (Average Quality Score / 10) * 100
    const value = ((commitsQualityReport.reduce((totalQualityScore, commitQuality) => totalQualityScore + commitQuality, 0)) / TOTAL_COMMITS_LIMIT) * 10;
    return Math.min(100, value);
}


export {
    getRepoCountScore,
    getFollowersCountScore,
    getFollowingRatioScore,
    getLanguagesCountScore,
    getStarsCountScore,
    getForksCountScore,
    getTotalCommitsScore,
    getRestrictedContributionCountScore,
    getProfileReadmeScore,
    getPullRequestsCountScore,
    getIssuesCountScore,
    getStreakScore,
    getCommitsQualityScore,
    getPinnedReposScore,
}