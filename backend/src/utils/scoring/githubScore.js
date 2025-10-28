import { githubAPI } from "../../api/axiosInstance.js";
import { TOTAL_COMMITS_LIMIT } from "../fetching/githubFetch.js";

const getRepoCountScore = (repoCount) => {
    const value = (Math.min(repoCount, 30) / 30) * 100;
    return value;
}

const getFollowersCountScore = (followersCount) => {
    const value = Math.min(100, followersCount*2);
    return value;
}

const getFollowingRatioScore = (followersCount, followingCount) => {
    let value;
    if (followingCount == 0) value = getFollowersCountScore(followersCount);
    else value = Math.min(followersCount/followingCount, 1)*100;
    return value;
}

const getLanguagesCountScore = (languagesCount) => {
    const value = Math.min(100, languagesCount*10);
    return value;
}

const getStarsCountScore = (starsCount) => {
    const value = Math.min(100, starsCount*2);
    return value;
}

const getForksCountScore = (forksCount) => {
    const value = Math.min(100, forksCount*5);
    return value;
}

const getTotalCommitsScore = (totalCommits) => {
    const value = Math.min(100, totalCommits*0.1);
    return value;
}

const getPullRequestsCountScore = (totalPullRequests) => {
    const value = Math.min(100, totalPullRequests*2);
    return value;
}

const getIssuesCountScore = (issuesCount) => {
    const value = Math.min(100, issuesCount*4);
    return value;
}

const getPinnedReposCountScore = (pinnedReposCount) => {
    const value = (pinnedReposCount/6)*100;
    return value;
}

const getProfileReadmeScore = async (username) => {
    try {
        const profileReadmeResponse = await githubAPI.get(`/repos/${username}/${username}/readme`);
        const profileReadmeData = profileReadmeResponse.data;
        const value = ("url" in profileReadmeData) ? 100 : 0;
        return value;
    } catch (error){
        return 0;
    }
}

const getStreakScore = (maxStreak, currentStreak, activeDays) => {
    const value = Math.min(100, maxStreak)*0.25 + Math.min(100, currentStreak*4)*0.15 + Math.min(100, activeDays/3.66)*0.6;
    return value;
}

const getCommitsQualityScore = (commitsQualityReport) => {
    const value = ((commitsQualityReport.reduce((totalQualityScore, commitQuality)=>totalQualityScore + commitQuality, 0)) / TOTAL_COMMITS_LIMIT)*10;
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