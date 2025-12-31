// The base of the natural logarithm (e) is Math.E in JavaScript
// The natural logarithm (ln) is Math.log()
// The logarithm to base 10 (log10) is Math.log10()

// Total commits limit remains relevant for the commits quality function
import { TOTAL_COMMITS_LIMIT } from "../fetching/githubFetch.js";

const getRepoCountScore = (repoCount) => {
    // Logarithmic: Harder to max out, maxes around 50 repos (log10(51) is approx 1.7)
    // Scale: 100 * log10(C+1) / 2 
    const cappedCount = Math.min(repoCount, 50);
    const value = 100 * (Math.log10(cappedCount + 1) / 2);
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
    const value = 10 * languagesCount + 20 * Math.log10(languagesCount + 1);
    return Math.min(100, value);
}

const getStarsCountScore = (starsCount) => {
    // Combination of Linear and Logarithmic (log10)
    // Formula: 10 * C + 50 * log10(C+1)
    const value = 10 * starsCount + 50 * Math.log10(starsCount + 1);
    return Math.min(100, value);
}

const getForksCountScore = (forksCount) => {
    // Highly Logarithmic (ln) to reward repos that are heavily forked
    // Formula: 40 * ln(C+1)
    const value = 40 * Math.log(forksCount + 1);
    return Math.min(100, value);
}

const getTotalCommitsScore = (totalCommits) => {
    // Uses a smooth Sigmoid-like function (1 - e^(-C/k)) which grows fast initially but gradually approaches 100
    // Maxes near 100 with diminishing returns (k=2000 is the rate constant)
    const value = 100 * (1 - Math.exp(-totalCommits / 2000));
    return Math.min(100, value);
}

const getPullRequestsCountScore = (totalPullRequests) => {
    // Square Root: Rewards quality contributions, but needs substantially more to max out
    // Formula: 50 * sqrt(C)
    const value = 50 * Math.sqrt(totalPullRequests);
    return Math.min(100, value);
}

const getIssuesCountScore = (issuesCount) => {
    // Square Root: Similar to PRs, encouraging issue creation/resolution
    // Formula: 50 * sqrt(C)
    const value = 50 * Math.sqrt(issuesCount);
    return Math.min(100, value);
}

// Kept the original Pinned Repos and Profile Readme as they are simple count/binary metrics

const getPinnedReposCountScore = (pinnedReposCount) => {
    const value = (pinnedReposCount / 6) * 100;
    return value;
}

// NOTE: getProfileReadmeScore is an async function and requires the githubAPI import to work
const getProfileReadmeScore = async (profileReadme) => {
    if (!profileReadme) return 0;
    return 100;
}

const getPinnedReposScore = (pinnedRepos) => {
    let score = 0;
    for (let i=0; i<pinnedRepos.length; i++){
        const pinnedRepo = pinnedRepos[i];
        let repoScore = 0;

        if (pinnedRepo.description) repoScore = repoScore + 10;
        if (pinnedRepo.readmeFile) repoScore = repoScore + 90;
        if (pinnedRepo?.repositoryTopics?.nodes) repoScore = repoScore + 10*Math.min(1, pinnedRepo?.repositoryTopics?.nodes.length/10);
        score = score + repoScore/6;
    }
    return Math.min(100, score);
}

const getStreakScore = (maxStreak, currentStreak, activeDays) => {
    // Focuses on long-term commitment (Max Streak and Active Days) using Logarithmic (log10)
    // Formula: 50 * log10(MaxStreak+1)/2 + 50 * log10(ActiveDays+1)/3
    // Note: Current Streak is less weighted as it's volatile.
    const maxStreakWeight = 50 * (Math.log10(maxStreak + 1) / 2);
    const activeDaysWeight = 50 * (Math.log10(activeDays + 1) / 3);
    
    // Add a small linear component for current streak, capped at 10 points
    const currentStreakWeight = Math.min(10, currentStreak * 0.1);

    const value = maxStreakWeight + activeDaysWeight + currentStreakWeight;
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
    getProfileReadmeScore,
    getPinnedReposCountScore,
    getPullRequestsCountScore,
    getIssuesCountScore,
    getStreakScore,
    getCommitsQualityScore,
    getPinnedReposScore,
}