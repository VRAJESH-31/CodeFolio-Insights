import { githubAPI, githubGraphQlQuery, githubRestApiQuery, scrapeSpideyAPI } from "./axiosInstance.js";
import { getCommitAnalysis} from "../utils/geminiResponse.js";
import { SCRAPE_SPIDEY_API_KEY } from "./config.js";
import { gitHubApiQueries } from "./constants.js";

const PAGE_SIZE = 100;
const TOTAL_COMMITS_LIMIT = 25;

const getUserProfileData = async (username) => {
    const data = await githubRestApiQuery(`/users/${username}`);
    if (data == null) return null;
    return data;
}

const getCommitsQualityReport = async (username) => {

    let commitsArray = [];
    const userRepoData = await githubRestApiQuery(`/users/${username}/repos?per_page=${PAGE_SIZE}`);
    if (userRepoData == null) return [];
    
    for (let i=0; i<userRepoData.length && commitsArray.length < TOTAL_COMMITS_LIMIT; i++){
        const repoData = userRepoData[i];
        const repoName = repoData["name"];

        const repoCommits = await githubRestApiQuery(`/repos/${username}/${repoName}/commits?per_page=${PAGE_SIZE}`);
        if (repoCommits != null){
            for (let j=0; j<repoCommits.length; j++){
                if (commitsArray.length < TOTAL_COMMITS_LIMIT){
                    commitsArray.push(repoCommits[j]["commit"]["message"]);
                } else {
                    break;
                }
            }
        }
    }

    return getCommitAnalysis(commitsArray);
}

const getCommitsPerRepo = async (repoName, username) => {

    let commitCount = 0;
    let pageNo = 1;

    while (true){
        const temp = await githubRestApiQuery(`/repos/${username}/${repoName}/commits?per_page=${PAGE_SIZE}&page=${pageNo}`);
        if (temp == null) continue;
        if (temp.length == 0) break;
        commitCount = commitCount + temp.length;
        pageNo++;
    }

    return commitCount;
}

const getPinnedReposCount = async (username) => {
    const query = gitHubApiQueries.GITHUB_TOTAL_PINNED_REPO_COUNT_QUERY;
    const pinnedRepoData = await githubGraphQlQuery(query, {username});
    if (pinnedRepoData == null) return 0;
    return pinnedRepoData["data"]["user"]["pinnedItems"]["totalCount"];
}

const getContributionCount = async (username) => {

    const query = gitHubApiQueries.GITHUB_FIRST_100_REPOS_CONTRIBUTION_QUERY;
    const defaultData = {
        "pullRequestContributions": {
            "totalCount": 0
        },
        "issueContributions": {
            "totalCount": 0
        }
    };

    const contributionCountData = await githubGraphQlQuery(query, {username});
    if (contributionCountData == null) return defaultData;
    return contributionCountData["data"]["user"]["contributionsCollection"];
}

const getContributionCalendar = async (username) => {
    const query = gitHubApiQueries.GITHUB_CONTRIBUTION_CALENDAR_QUERY;
    const contributionCalendarData = await githubGraphQlQuery(query, {username});
    if (contributionCalendarData == null) return [];
    else return contributionCalendarData["data"]["user"]["contributionsCollection"]["contributionCalendar"]["weeks"];
}

const getUserStreak = async (contributionCalendar) => {

    let currentStreak = 0;
    let maxStreak = 0;
    let activeDays = 0;

    for (let i=0; i<contributionCalendar.length; i++){
        const week = contributionCalendar[i];
        for (let day=0; day<week["contributionDays"].length; day++){
            let dailyContributions = week["contributionDays"][day]["contributionCount"];
            if (dailyContributions == 0){
                currentStreak = 0;
            } else {
                currentStreak++;
                activeDays++;
                maxStreak = Math.max(maxStreak, currentStreak);
            }
        }
    }

    return {currentStreak, maxStreak, activeDays};
}

const getUserRepos = async (username, repoCount) => {

    let userReposStat = [];

    for (let i=0; i<Math.ceil(repoCount/100); i++){
        const userRepoData = await githubRestApiQuery(`/users/${username}/repos?per_page=${PAGE_SIZE}&page=${i+1}`);
        if (userRepoData != null){
            for (let j=0; j<userRepoData.length; j++){
                const repoData = userRepoData[j];
                userReposStat.push(repoData);
            }
        }
    }

    return userReposStat;
}

const getRepoLanguages = async (username, repoName) => {
    const data = await githubRestApiQuery(`/repos/${username}/${repoName}/languages`);
    if (data == null) return {};
    return data;
}

const getLastYearCommitsCount = async (username) => {
    const query = gitHubApiQueries.GITHUB_LAST_YEAR_COMMITS_COUNT;
    const lastYearCommitsData = await githubGraphQlQuery(query, {username});
    if (lastYearCommitsData == null) return 0;
    return lastYearCommitsData["data"]["user"]["contributionsCollection"]["contributionCalendar"]["totalContributions"];
}   

const getLanguageUsageStats = (uniqueLanguages, userReposLanguageStat) => {

    let languageUsage = {};
    const languageUsagePerRepos = userReposLanguageStat.map((repo)=>repo["languageUsedInBytes"]);

    for (let language of uniqueLanguages){
        languageUsage[language] = 0;
    }

    for (let i=0; i<languageUsagePerRepos.length; i++){
        for (let language in languageUsagePerRepos[i]){
            languageUsage[language] = languageUsage[language] + languageUsagePerRepos[i][language];
        }
    }

    return languageUsage;
}

const getGithubContributionBadges = async (username) => {
    try {
        const githubBadgesResponse = await scrapeSpideyAPI.get(`/api/v1/github/user/badges/${username}?apiKey=${SCRAPE_SPIDEY_API_KEY}`);
        if (githubBadgesResponse.status >= 400){
            return [];
        } else {
            return githubBadgesResponse.data;
        }
    } catch (error) {
        console.log("Error occurred while fetching github badges: ", error.message);
        console.log(error.stack);
        return [];
    }
}


export {
    PAGE_SIZE,
    TOTAL_COMMITS_LIMIT,
    getCommitsPerRepo,
    getPinnedReposCount,
    getContributionCount,
    getUserStreak,
    getUserProfileData,
    getUserRepos,
    getRepoLanguages,
    getLastYearCommitsCount,
    getCommitsQualityReport,
    getContributionCalendar,
    getLanguageUsageStats,
    getGithubContributionBadges,
}