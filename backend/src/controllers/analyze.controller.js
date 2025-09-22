import { getRepoCountScore, getFollowersCountScore, getFollowingRatioScore, getLanguagesCountScore, getTotalCommitsScore, getForksCountScore, getStarsCountScore, getProfileReadmeScore, getIssuesCountScore, getPinnedReposCountScore, getPullRequestsCountScore, getStreakScore } from "../utils/githubScore.js";
import { PAGE_SIZE, getCommitsPerRepo, getPinnedReposCount, getContributionCount, getUserStreak, getUserProfileData, getUserRepos, getRepoLanguages } from "../utils/githubFetch.js"
import { githubAPI } from "../utils/axiosInstance.js";

const analyzeGithub = async (req, res) => {

    try {
        const username = req.query.username;
        let score = 0;

        const userDataResponse = await getUserProfileData(username);
        const userData = userDataResponse.data;

        const repoCount = userData["public_repos"];
        const followersCount = userData["followers"];
        const followingCount = userData["following"];
        const pinnedRepoCount = await getPinnedReposCount(username);
        let starsCount = 0;
        let forksCount = 0;
        let commitsCount = 0;
        let userReposStat = [];
        let userReposLanguageStat = [];
        let uniqueLanguages = new Set();


        userReposStat = await getUserRepos(username, repoCount);

        starsCount = userReposStat.reduce((totalStars, repoData)=>totalStars+repoData["stargazers_count"], 0);
        forksCount = userReposStat.reduce((totalForks, repoData)=>totalForks+repoData["forks_count"], 0);

        userReposLanguageStat = await Promise.all(
            userReposStat.map(async (repoData) => ({
                repoId: repoData.id,
                repoName: repoData.name,
                repoUrl: repoData.html_url,
                languageUsedInBytes: await getRepoLanguages(username, repoData.name),
            }))
        );

        const repoCommitsArray = await Promise.all(userReposStat.filter(repoData => !repoData["fork"]).map(repoData => getCommitsPerRepo(repoData["name"], username)));
        commitsCount = repoCommitsArray.reduce((sum, val) => sum + val, 0);

        uniqueLanguages = Array.from(userReposLanguageStat.reduce((languages, repoLanguageStats)=>{
            Object.keys(repoLanguageStats.languageUsedInBytes).forEach(lang => languages.add(lang));
            return languages;
        }, new Set()));

        const contributionCount = await getContributionCount(username);
        const pullRequestsCount = contributionCount["pullRequestContributions"]["totalCount"];
        const issueRequestsCount = contributionCount["issueContributions"]["totalCount"];

        const {currentStreak, maxStreak} = await getUserStreak(username);

        score = score + getRepoCountScore(repoCount)*0.1;
        score = score + getFollowersCountScore(followersCount)*0.025 
        score = score + getFollowingRatioScore(followersCount, followingCount)*0.025;
        score = score + getLanguagesCountScore(Array.from(uniqueLanguages).length)*0.05;
        score = score + getTotalCommitsScore(commitsCount)*0.15 
        score = score + getForksCountScore(forksCount)*0.1 
        score = score + getStarsCountScore(starsCount)*0.1; 
        score = score + await getProfileReadmeScore(username)*0.1;
        score = score + getPinnedReposCountScore(pinnedRepoCount)*0.05;
        score = score + getPullRequestsCountScore(pullRequestsCount)*0.15;
        score = score + getIssuesCountScore(issueRequestsCount)*0.15;
        score = score + getStreakScore(maxStreak)*0.05;

        return res.status(200).json({score});

    } catch (error){
        console.log("Error occurred while fetching github data: ", error.message);
        console.log(error.stack)
        return res.status(500).json({"message" : "Couldn't retrieve user data"});
    }
}

export {
    analyzeGithub,
}