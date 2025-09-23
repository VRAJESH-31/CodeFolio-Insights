import { githubAPI, scrapeSpideyAPI } from "./axiosInstance.js";
import { getCommitAnalysis} from "../utils/geminiResponse.js";
import { SCRAPE_SPIDEY_API_KEY } from "./config.js";

const PAGE_SIZE = 100;
const TOTAL_COMMITS_LIMIT = 25;

const getUserProfileData = async (username) => {
    try {
        return await githubAPI.get(`/users/${username}`)
    } catch (error) {
        console.log("Error occurred while fetching user profile data:", error.message);
        console.log(error.stack);
        return null;
    }
}

const getCommitsQualityReport = async (username) => {

    let commitsArray = [];

    try{
        const userRepoResponse = await githubAPI.get(`/users/${username}/repos?per_page=${PAGE_SIZE}`);
        const userRepoData = userRepoResponse.data;

        for (let i=0; i<userRepoData.length && commitsArray.length < TOTAL_COMMITS_LIMIT; i++){
            const repoData = userRepoData[i];
            const repoName = repoData["name"];

            const repoCommits = (await githubAPI.get(`/repos/${username}/${repoName}/commits?per_page=${PAGE_SIZE}`)).data;

            for (let j=0; j<repoCommits.length; j++){
                if (commitsArray.length < TOTAL_COMMITS_LIMIT){
                    commitsArray.push(repoCommits[j]["commit"]["message"]);
                } else {
                    break;
                }
            }
        }

        return await getCommitAnalysis(commitsArray);
    } catch (error){
        console.log("Error Occurred while getting commits quality report:", error.message);
        console.log(error.stack);
        return [];
    }

}

const getCommitsPerRepo = async (repoName, username) => {
    try {
        let commitCount = 0;
        let pageNo = 1;

        while (true){
            const temp = (await githubAPI.get(`/repos/${username}/${repoName}/commits?per_page=${PAGE_SIZE}&page=${pageNo}`)).data;
            if (temp.length == 0) break;
            commitCount = commitCount + temp.length;
            pageNo++;
        }

        return commitCount;
    } catch (error) {
        console.log("Error Occurred while getting repo commits:", error.message);
        console.log(error.stack);
        return 0;
    }
}

const getPinnedReposCount = async (username) => {
    try {
        const query = `
            {
                user(login: "${username}") {
                        pinnedItems(first: 6, types: REPOSITORY) {
                        totalCount
                    }
                }
            }
        `;

        const pinnedRepoResponse = await githubAPI.post('/graphql', {query});
        const pinnedRepoData = pinnedRepoResponse.data;
        return pinnedRepoData["data"]["user"]["pinnedItems"]["totalCount"];
    } catch (error){
        console.log("Error occurred while fetching pinned repo count:", error.message);
        console.log(error.stack);
        return 0;
    }
}

const getContributionCount = async (username) => {
    try {
        const query = `
            {
                user(login: "${username}") {
                    contributionsCollection {
                        pullRequestContributions(first: 100) {
                            totalCount
                        }
                        issueContributions(first: 100) {
                            totalCount
                        }
                    }
                }
            }
        `;

        const contributionCountResponse = await githubAPI.post("/graphql", {query});
        return contributionCountResponse.data["data"]["user"]["contributionsCollection"];
    } catch (error) {
        console.log("Error occurred while fetching contribution counts:", error.message);
        console.log(error.stack);
        return JSON.parse({
            "pullRequestContributions": {
                "totalCount": 0
            },
            "issueContributions": {
                "totalCount": 0
            }
        });
    }
}

const getContributionCalendar = async (username) => {
    try { 
        const query = `
            {
                user(login: "${username}") {
                    contributionsCollection {
                        contributionCalendar {
                            weeks {
                                contributionDays {
                                    contributionCount
                                    date
                                }
                            }
                        }
                    }
                }
            }
        `

        const contributionCalendarResponse = await githubAPI.post("/graphql", {query});
        const contributionCalendarData = contributionCalendarResponse.data["data"]["user"]["contributionsCollection"]["contributionCalendar"]["weeks"];

        return contributionCalendarData;
    } catch (error) {
        console.log("Error occurred while fetching contribution calendar: ", error);
        console.log(error.stack);
        return [];
    }
}

const getUserStreak = async (contributionCalendar) => {
    try {
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
    } catch (error){
        console.log("Error occurred while getting user streaks and total active days: ", error.message);
        console.log(error.stack);
        return {currentStreak: 0, maxStreak: 0, activeDays: 0};
    }
}

const getUserRepos = async (username, repoCount) => {

    let userReposStat = [];

    for (let i=0; i<Math.ceil(repoCount/100); i++){
        try {
            const userRepoResponse = await githubAPI.get(`/users/${username}/repos?per_page=${PAGE_SIZE}&page=${i+1}`);
            const userRepoData = userRepoResponse.data;

            for (let j=0; j<userRepoData.length; j++){
                const repoData = userRepoData[j];
                userReposStat.push(repoData);
            }
        } catch (error){
            console.log(`Error Occurred while fetching repos`, error.message);
            error.stack();
        }
    }

    return userReposStat;
}

const getRepoLanguages = async (username, repoName) => {
    try {
        return (await githubAPI.get(`/repos/${username}/${repoName}/languages`)).data;
    } catch (error) {
        console.log("Error occurred while fetching repo languages:", error.message);
        console.log(error.stack);
        return {};
    }
}

const getLastYearCommitsCount = async (username) => {
    try {
        const query = `
            {
                user(login: "${username}") {
                    contributionsCollection {
                        contributionCalendar {
                            totalContributions
                        }
                    }
                }
            }
        `;
        const lastYearCommitsResponse = await githubAPI.post("/graphql", {query});
        const lastYearCommitsData = lastYearCommitsResponse.data;
        return lastYearCommitsData["data"]["user"]["contributionsCollection"]["contributionCalendar"]["totalContributions"];
    } catch (error) {
        console.log("Error occurred while fetching last year commits count:", error.message);
        console.log(error.stack);
        return 0;
    }
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
            console.log(githubBadgesResponse.data);
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