import { getRepoCountScore, getFollowersCountScore, getFollowingRatioScore, getLanguagesCountScore, getTotalCommitsScore, getForksCountScore, getStarsCountScore, getProfileReadmeScore } from "../utils/githubScore.js";
import { githubAPI } from "../utils/axiosInstance.js";

const analyzeGithub = async (req, res) => {

    try {
        const username = req.query.username;
        let score = 0;
        const pageSize = 100;

        const getCommitsPerRepo = async (repoName) => {
            let commitCount = 0;
            let pageNo = 1;

            while (true){
                const temp = (await githubAPI.get(`/repos/${username}/${repoName}/commits?per_page=${pageSize}&page=${pageNo}`)).data;
                if (temp.length == 0) break;
                commitCount = commitCount + temp.length;
                pageNo++;
            }

            return commitCount;
        }

        const userDataResponse = await githubAPI.get(`/users/${username}`);
        const userData = userDataResponse.data;

        const repoCount = userData["public_repos"];
        const followersCount = userData["followers"];
        const followingCount = userData["following"];
        let starsCount = 0;
        let forksCount = 0;
        let commitsCount = 0;
        let userReposStat = [];
        let userReposLanguageStat = [];
        let uniqueLanguages = new Set();


        for (let i=0; i<Math.ceil(repoCount/100); i++){
            const userRepoResponse = await githubAPI.get(`/users/${username}/repos?per_page=${pageSize}&page=${i+1}`);
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

            const commitPromises = userRepoData.filter(repoData => !repoData["fork"]).map(repoData => getCommitsPerRepo(repoData["name"]));
            const repoCommitsArray = await Promise.all(commitPromises);
            commitsCount = repoCommitsArray.reduce((sum, val) => sum + val, 0);

        }

        for (let i=0; i<userReposLanguageStat.length; i++){
            const languageLists = userReposLanguageStat[i].languageUsedInBytes;
            for (let language in languageLists){
                uniqueLanguages.add(language);
            }
        }

        score = score + getRepoCountScore(repoCount)*0.1;
        score = score + getFollowersCountScore(followersCount)*0.025 
        score = score + getFollowingRatioScore(followersCount, followingCount)*0.025;
        score = score + getLanguagesCountScore(Array.from(uniqueLanguages).length)*0.05;
        score = score + getTotalCommitsScore(commitsCount)*0.15 
        score = score + getForksCountScore(forksCount)*0.1 
        score = score + getStarsCountScore(starsCount)*0.1; 
        score = score + await getProfileReadmeScore(username)*0.1;

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