import { githubGraphQlQuery, githubRestApiQuery, scrapeSpideyAPI } from "../../api/axiosInstance.js";
import { getCommitAnalysis } from "../geminiUtils.js";
import { SCRAPE_SPIDEY_API_KEY } from "../../config/config.js";
import { GITHUB_API_QUERIES } from "../../constant/constants.js";
import { getPolishedGithubHeatmap } from "../../utils/calendar.js";

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

    for (let i = 0; i < userRepoData.length && commitsArray.length < TOTAL_COMMITS_LIMIT; i++) {
        const repoData = userRepoData[i];
        const repoName = repoData["name"];

        const repoCommits = await githubRestApiQuery(`/repos/${username}/${repoName}/commits?per_page=${PAGE_SIZE}`);
        if (repoCommits != null) {
            for (let j = 0; j < repoCommits.length; j++) {
                if (commitsArray.length < TOTAL_COMMITS_LIMIT) {
                    commitsArray.push(repoCommits[j]["commit"]["message"]);
                } else {
                    break;
                }
            }
        }
    }

    return getCommitAnalysis(commitsArray);
}

const getCommitsPerRepo = async (reponame, username) => {
    const query = GITHUB_API_QUERIES.GITHUB_REPO_TOTAL_COMMITS_COUNT_QUERY;
    const commitCount = await githubGraphQlQuery(query, { username, reponame });
    if (commitCount == null) return 0;
    return commitCount;
}

const getGithubPinnedRepos = async (username) => {
    const query = GITHUB_API_QUERIES.GITHUB_PINNED_REPOS_QUERY;
    const pinnedRepoData = await githubGraphQlQuery(query, { username });
    if (pinnedRepoData == null || pinnedRepoData["data"]["user"]["pinnedItems"]["nodes"] == null) return [];
    return pinnedRepoData["data"]["user"]["pinnedItems"]["nodes"];
}

const getYearlyContributionCount = async (username, year) => {
    const query = GITHUB_API_QUERIES.GITHUB_CONTRIBUTION_COUNT_QUERY;
    const contributionCountData = await githubGraphQlQuery(query, { username, from: `${year}-01-01T00:00:00Z`, to: `${year}-12-31T23:59:59Z` });
    if (contributionCountData == null) return null;
    return contributionCountData["data"]["user"]["contributionsCollection"];
}

const getMultiYearContributionCount = async (username, startYear, endYear) => {
    let contributionCount = {pullRequestsCount: 0, issuesCount: 0, commitsCount: 0, pullRequestReviewsCount: 0, repositoriesCount: 0, restrictedCintributionCount: 0};
    for (let year = startYear; year <= endYear; year++) {
        const yearlyContributions = await getYearlyContributionCount(username, year);
        contributionCount.pullRequestsCount = contributionCount.pullRequestsCount + yearlyContributions?.pullRequestContributions?.totalCount;
        contributionCount.issuesCount = contributionCount.issuesCount + yearlyContributions?.issueContributions?.totalCount;
        contributionCount.commitsCount = contributionCount.commitsCount + yearlyContributions?.totalCommitContributions;
        contributionCount.pullRequestReviewsCount = contributionCount.pullRequestReviewsCount + yearlyContributions?.pullRequestReviewContributions?.totalCount;
        contributionCount.repositoriesCount = contributionCount.repositoriesCount + yearlyContributions?.repositoryContributions?.totalCount;
        contributionCount.restrictedCintributionCount = contributionCount.restrictedCintributionCount + yearlyContributions?.restrictedContributionsCount;
    }
    return contributionCount;
}

const getLastYearContributionCalendar = async (username) => {
    const query = GITHUB_API_QUERIES.GITHUB_LAST_YEAR_CONTRIBUTION_CALENDAR_QUERY;
    const contributionCalendarData = await githubGraphQlQuery(query, { username });
    if (contributionCalendarData == null) return {};
    else return getPolishedGithubHeatmap(contributionCalendarData["data"]["user"]["contributionsCollection"]["contributionCalendar"]["weeks"]);
}

const getYearlyContributionCalendar = async (username, year) => {
    const query = GITHUB_API_QUERIES.GITHUB_YEARLY_CONTRIBUTION_CALENDAR_QUERY;
    const contributionCalendarData = await githubGraphQlQuery(query, { username, from: `${year}-01-01T00:00:00Z`, to: `${year}-12-31T23:59:59Z` });
    if (contributionCalendarData == null) return {};
    else return getPolishedGithubHeatmap(contributionCalendarData["data"]["user"]["contributionsCollection"]["contributionCalendar"]["weeks"]);
}

const getMultiYearContributionCalendar = async (username, startYear, endYear) => {
    let contributionCalendar = {};
    for (let year = startYear; year <= endYear; year++) {
        contributionCalendar[year] = await getYearlyContributionCalendar(username, year);
    }
    return contributionCalendar;
}

const getUserRepos = async (username, repoCount) => {

    let userReposStat = [];

    for (let i = 0; i < Math.ceil(repoCount / 100); i++) {
        const userRepoData = await githubRestApiQuery(`/users/${username}/repos?per_page=${PAGE_SIZE}&page=${i + 1}`);
        if (userRepoData != null) {
            for (let j = 0; j < userRepoData.length; j++) {
                const repoData = userRepoData[j];
                userReposStat.push(repoData);
            }
        }
    }

    return userReposStat;
}

const getGithubContributionBadges = async (username) => {
    try {
        const githubBadgesResponse = await scrapeSpideyAPI.get(`/api/v1/github/user/badges?user=${username}&apiKey=${SCRAPE_SPIDEY_API_KEY}`);
        if (githubBadgesResponse.status >= 400) {
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

const getRepoLanguages = async (username, repoName) => {
    const data = await githubRestApiQuery(`/repos/${username}/${repoName}/languages`);
    if (data == null) return {};
    return data;
}

const getUserLanguageStats = async (username) => {
    try {
        const userData = await getUserProfileData(username);
        const repoCount = userData["public_repos"];

        const userReposStat = await getUserRepos(username, repoCount);

        const userReposLanguageStats = await Promise.all(
            userReposStat.map((repoData) => getRepoLanguages(username, repoData.name))
        );

        const languageUsageInBytes = {};

        for (let i=0; i<userReposLanguageStats.length; i++){
            Object.keys(userReposLanguageStats[i]).forEach((language)=>{
                languageUsageInBytes[language] = (languageUsageInBytes[language] || 0) + userReposLanguageStats[i][language];
            })
        }

        return languageUsageInBytes;
    } catch (error) {
        console.log("Error occurred while fetching github language stats: ", error.message);
        console.log(error.stack);
        return [];
    }
}

const getProfileReadme = async (username) => {
    const query = GITHUB_API_QUERIES.GITHUB_PROFILE_README_QUERY;
    const profileReadmeData = await githubGraphQlQuery(query, { username });
    if (profileReadmeData == null || profileReadmeData["data"]["user"]["profileReadmeRepo"] == null) return null;
    return profileReadmeData["data"]["user"]["profileReadmeRepo"];
}

const getUserStarsAndForks = async (username) => {
    let starsCount = 0, forksCount = 0;
    const repoCount = (await getUserProfileData(username))?.public_repos;
    
    for (let i = 0; i < Math.ceil(repoCount / PAGE_SIZE); i++) {
        const userRepoData = await githubRestApiQuery(`/users/${username}/repos?per_page=${PAGE_SIZE}&page=${i + 1}`);
        if (userRepoData != null) {
            for (let j = 0; j < userRepoData.length; j++) {
                const repoData = userRepoData[j];
                starsCount += repoData.stargazers_count;
                forksCount += repoData.forks_count;
            }
        }
    }

    return { starsCount, forksCount };
}


export {
    PAGE_SIZE,
    TOTAL_COMMITS_LIMIT,
    getCommitsPerRepo,
    getUserProfileData,
    getUserRepos,
    getRepoLanguages,
    getCommitsQualityReport,
    getGithubContributionBadges,
    getUserLanguageStats,
    getProfileReadme,
    getYearlyContributionCalendar,
    getMultiYearContributionCalendar,
    getGithubPinnedRepos,
    getUserStarsAndForks,
    getMultiYearContributionCount,
    getLastYearContributionCalendar,
}