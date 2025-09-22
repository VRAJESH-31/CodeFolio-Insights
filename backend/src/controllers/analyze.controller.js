import { getRepoCountScore, getFollowersCountScore, getFollowingRatioScore, getLanguagesCountScore, getTotalCommitsScore, getForksCountScore, getStarsCountScore, getProfileReadmeScore, getIssuesCountScore, getPinnedReposCountScore, getPullRequestsCountScore, getStreakScore } from "../utils/githubScore.js";
import { githubAPI } from "../utils/axiosInstance.js";

const analyzeGithub = async (req, res) => {

    const PAGE_SIZE = 100;

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
                    user(login: "Ashok-Bhatt") {
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


    try {
        const username = req.query.username;
        let score = 0;

        const userDataResponse = await githubAPI.get(`/users/${username}`);
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


        for (let i=0; i<Math.ceil(repoCount/100); i++){
            const userRepoResponse = await githubAPI.get(`/users/${username}/repos?per_page=${PAGE_SIZE}&page=${i+1}`);
            const userRepoData = userRepoResponse.data;

            for (let j=0; j<userRepoData.length; j++){
                const repoData = userRepoData[j];
                userReposStat.push(repoData);
                starsCount = starsCount + repoData["stargazers_count"];
                forksCount = forksCount + repoData["forks_count"];

                const languageStats = {
                    repoId : repoData.id,
                    repoName : repoData.name,
                    repoUrl : repoData.html_url,
                    languageUsedInBytes: (await githubAPI.get(`/repos/${username}/${repoData.name}/languages`)).data,
                }
                userReposLanguageStat.push(languageStats);
            }

            const commitPromises = userRepoData.filter(repoData => !repoData["fork"]).map(repoData => getCommitsPerRepo(repoData["name"], username));
            const repoCommitsArray = await Promise.all(commitPromises);
            commitsCount = repoCommitsArray.reduce((sum, val) => sum + val, 0);

        }

        for (let i=0; i<userReposLanguageStat.length; i++){
            const languageLists = userReposLanguageStat[i].languageUsedInBytes;
            for (let language in languageLists){
                uniqueLanguages.add(language);
            }
        }

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