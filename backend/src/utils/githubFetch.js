import { githubAPI } from "./axiosInstance.js";

const PAGE_SIZE = 100;

const getUserProfileData = async (username) => {
    return await githubAPI.get(`/users/${username}`)
}

const getCommitsPerRepo = async (repoName, username) => {
    let commitCount = 0;
    let pageNo = 1;

    while (true){
        const temp = (await githubAPI.get(`/repos/${username}/${repoName}/commits?per_page=${PAGE_SIZE}&page=${pageNo}`)).data;
        if (temp.length == 0) break;
        commitCount = commitCount + temp.length;
        pageNo++;
    }

    return commitCount;
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
        console.log("Error occurred while fetching pinned epo count:", error.message);
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
        console.log("Error occurred while fetching pinned epo count:", error.message);
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

const getUserStreak = async (username) => {
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

        let currentStreak = 0;
        let maxStreak = 0;

        const contributionCalendarResponse = await githubAPI.post("/graphql", {query});
        const contributionCalendarData = contributionCalendarResponse.data["data"]["user"]["contributionsCollection"]["contributionCalendar"]["weeks"];

        for (let i=0; i<contributionCalendarData.length; i++){
            const week = contributionCalendarData[i];
            for (let day=0; day<week["contributionDays"].length; day++){
                let dailyContributions = week["contributionDays"][day]["contributionCount"];
                if (dailyContributions == 0){
                    currentStreak = 0;
                } else {
                    currentStreak++;
                    maxStreak = Math.max(maxStreak, currentStreak);
                }
            }
        }

        return {currentStreak, maxStreak};
    } catch (error){
        console.log("Error occurred while getting max streak: ", error);
        console.log(error.stack);
        return {currentStreak: 0, maxStreak: 0};
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
            console.log(`Error Occurred while fetching repos data page`);
            error.stack();
        }
    }

    return userReposStat;
}

const getRepoLanguages = async (username, repoName) => {
    return (await githubAPI.get(`/repos/${username}/${repoName}/languages`)).data
}


export {
    PAGE_SIZE,
    getCommitsPerRepo,
    getPinnedReposCount,
    getContributionCount,
    getUserStreak,
    getUserProfileData,
    getUserRepos,
    getRepoLanguages,
}