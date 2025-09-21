import { githubAPI } from "./axiosInstance.js";

const getRepoCountScore = (repoCount) => {
    console.log((Math.min(repoCount, 30) / 30) * 100)
    return (Math.min(repoCount, 30) / 30) * 100;
}

const getFollowersCountScore = (followersCount) => {
    console.log(Math.min(100, followersCount*2))
    return Math.min(100, followersCount*2);
}

const getFollowingRatioScore = (followersCount, followingCount) => {
    console.log(Math.min(followersCount/followingCount, 1)*100)
    if (followingCount == 0) return getFollowersCountScore(followersCount);
    else return Math.min(followersCount/followingCount, 1)*100;
}

const getLanguagesCountScore = (languagesCount) => {
    console.log(Math.min(100, languagesCount*10))
    return Math.min(100, languagesCount*10);
}

const getStarsCountScore = (starsCount) => {
    console.log(Math.min(100, starsCount*2))
    return Math.min(100, starsCount*2);
}

const getForksCountScore = (forksCount) => {
    console.log(Math.min(100, forksCount*5))
    return Math.min(100, forksCount*5);
}

const getTotalCommitsScore = (totalCommits) => {
    console.log(Math.min(100, totalCommits*0.1))
    return Math.min(100, totalCommits*0.1);
}

const getTotalPullRequestsScore = (totalPullRequests) => {
    console.log(Math.min(100, totalPullRequests))
    return Math.min(100, totalPullRequests);
}

const getProfileReadmeScore = async (username) => {
    const profileReadme = (await githubAPI.get(`/repos/${username}/${username}/readme`)).data;
    if (profileReadme["url"]) return 100;
    else return 0;
}



export {
    getRepoCountScore,
    getFollowersCountScore,
    getFollowingRatioScore,
    getLanguagesCountScore,
    getStarsCountScore,
    getForksCountScore,
    getTotalCommitsScore,
    getTotalPullRequestsScore,
    getProfileReadmeScore
}