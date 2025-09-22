import { githubAPI } from "./axiosInstance.js";
import { TOTAL_COMMITS_LIMIT } from "./githubFetch.js";

const getRepoCountScore = (repoCount) => {
    const value = (Math.min(repoCount, 30) / 30) * 100;
    console.log('getRepoCountScore:', value);
    return value;
}

const getFollowersCountScore = (followersCount) => {
    const value = Math.min(100, followersCount*2);
    console.log('getFollowersCountScore:', value);
    return value;
}

const getFollowingRatioScore = (followersCount, followingCount) => {
    let value;
    if (followingCount == 0) value = getFollowersCountScore(followersCount);
    else value = Math.min(followersCount/followingCount, 1)*100;
    console.log('getFollowingRatioScore:', value);
    return value;
}

const getLanguagesCountScore = (languagesCount) => {
    const value = Math.min(100, languagesCount*10);
    console.log('getLanguagesCountScore:', value);
    return value;
}

const getStarsCountScore = (starsCount) => {
    const value = Math.min(100, starsCount*2);
    console.log('getStarsCountScore:', value);
    return value;
}

const getForksCountScore = (forksCount) => {
    const value = Math.min(100, forksCount*5);
    console.log('getForksCountScore:', value);
    return value;
}

const getTotalCommitsScore = (totalCommits) => {
    const value = Math.min(100, totalCommits*0.1);
    console.log('getTotalCommitsScore:', value);
    return value;
}

const getPullRequestsCountScore = (totalPullRequests) => {
    const value = Math.min(100, totalPullRequests*2);
    console.log('getPullRequestsCountScore:', value);
    return value;
}

const getIssuesCountScore = (issuesCount) => {
    const value = Math.min(100, issuesCount*4);
    console.log('getIssuesCountScore:', value);
    return value;
}

const getPinnedReposCountScore = (pinnedReposCount) => {
    const value = (pinnedReposCount/6)*100;
    console.log('getPinnedReposCountScore:', value);
    return value;
}

const getProfileReadmeScore = async (username) => {
    try {
        const profileReadmeResponse = await githubAPI.get(`/repos/${username}/${username}/readme`);
        const profileReadmeData = profileReadmeResponse.data;
        const value = ("url" in profileReadmeData) ? 100 : 0;
        console.log('getProfileReadmeScore:', value);
        return value;
    } catch (error){
        console.log('getProfileReadmeScore:', 0);
        return 0;
    }
}

const getStreakScore = (maxStreak, currentStreak, activeDays) => {
    const value = Math.min(100, maxStreak)*0.25 + Math.min(100, currentStreak*4)*0.15 + Math.min(100, activeDays/3.66)*0.6;
    console.log('getStreakScore:', value);
    return value;
}

const getCommitsQualityScore = (commitsQualityReport) => {
    const value = ((commitsQualityReport.reduce((totalQualityScore, commitQuality)=>totalQualityScore + commitQuality, 0)) / TOTAL_COMMITS_LIMIT)*10;
    console.log('getCommitsQualityScore', value);
    return value;
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
}