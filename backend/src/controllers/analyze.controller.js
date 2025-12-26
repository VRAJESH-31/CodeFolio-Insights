import * as githubScoring from "../utils/scoring/githubScore.js";
import * as githubFetching from "../utils/fetching/githubFetch.js"
import * as scrapeSpideyFetching from "../utils/fetching/scrapeSpideyFetch.js"
import { getGithubProfileAnalysis, getLeetCodeProfileAnalysis, getResumeAnalysis } from "../utils/geminiUtils.js";
import * as leetCodeScoring from "../utils/scoring/leetcodeScore.js";
import { getPdfContent } from "../utils/pdfUtils.js";
import { MAX_PDF_SIZE } from "../constant/constants.js";
import scoreModel from "../models/score.model.js";
import handleError from '../utils/handleError.js';


const analyzeGithub = async (req, res) => {
    try {
        const username = req.query.username;
        let score = 0;

        const userData = await githubFetching.getUserProfileData(username);

        const repoCount = userData["public_repos"];
        const followersCount = userData["followers"];
        const followingCount = userData["following"];
        const pinnedRepoCount = await githubFetching.getPinnedReposCount(username);
        let starsCount = 0;
        let forksCount = 0;
        let lastYearCommitsCount = 0;
        let userReposStat = [];
        let userReposLanguageStat = [];
        let uniqueLanguages = new Set();
        let languageUsageInBytes = {};

        userReposStat = await githubFetching.getUserRepos(username, repoCount);

        starsCount = userReposStat.filter((repo) => repo["fork"] == false).reduce((totalStars, repoData) => totalStars + repoData["stargazers_count"], 0);
        forksCount = userReposStat.filter((repo) => repo["fork"] == false).reduce((totalForks, repoData) => totalForks + repoData["forks_count"], 0);

        userReposLanguageStat = await Promise.all(
            userReposStat.filter((repo) => repo["fork"] == false).map(async (repoData) => ({
                repoId: repoData.id,
                repoName: repoData.name,
                repoUrl: repoData.html_url,
                languageUsedInBytes: await githubFetching.getRepoLanguages(username, repoData.name),
            }))
        );

        lastYearCommitsCount = await githubFetching.getLastYearCommitsCount(username);

        uniqueLanguages = Array.from(userReposLanguageStat.reduce((languages, repoLanguageStats) => {
            Object.keys(repoLanguageStats.languageUsedInBytes).forEach(lang => languages.add(lang));
            return languages;
        }, new Set()));

        languageUsageInBytes = githubFetching.getLanguageUsageStats(uniqueLanguages, userReposLanguageStat);

        const contributionCount = await githubFetching.getContributionCount(username);
        const pullRequestsCount = contributionCount["pullRequestContributions"]["totalCount"];
        const issueRequestsCount = contributionCount["issueContributions"]["totalCount"];

        const contributionCalendar = await githubFetching.getContributionCalendar(username);
        const { currentStreak, maxStreak, activeDays } = await githubFetching.getUserStreak(contributionCalendar);
        const githubContributionBadges = await githubFetching.getGithubContributionBadges(username);

        const commitsQualityReport = await githubFetching.getCommitsQualityReport(username);
        const commitsQualityReportArray = Object.values(commitsQualityReport).map((commit) => commit["rating"]);

        const githubData = {
            userData,
            repoCount,
            followersCount,
            followingCount,
            pinnedRepoCount,
            starsCount,
            forksCount,
            lastYearCommitsCount,
            languageUsageInBytes,
            userReposStat: userReposStat.slice(0, 5),
            contributionCount,
            pullRequestsCount,
            issueRequestsCount,
            commitsQualityReport: Object.values(commitsQualityReport).slice(0, 5),
            currentStreak,
            maxStreak,
            activeDays,
        }

        const profileAnalysis = await getGithubProfileAnalysis(githubData);

        const repoCountScore = githubScoring.getRepoCountScore(repoCount);
        const followersCountScore = githubScoring.getFollowersCountScore(followersCount);
        const followingRatioScore = githubScoring.getFollowingRatioScore(followersCount, followingCount);
        const languagesCountScore = githubScoring.getLanguagesCountScore(Array.from(uniqueLanguages).length);
        const totalCommitsScore = githubScoring.getTotalCommitsScore(lastYearCommitsCount);
        const forksCountScore = githubScoring.getForksCountScore(forksCount);
        const starsCountScore = githubScoring.getStarsCountScore(starsCount);
        const profileReadmeScore = await githubScoring.getProfileReadmeScore(username);
        const pinnedReposCountScore = githubScoring.getPinnedReposCountScore(pinnedRepoCount);
        const pullRequestsCountScore = githubScoring.getPullRequestsCountScore(pullRequestsCount);
        const issuesCountScore = githubScoring.getIssuesCountScore(issueRequestsCount);
        const streakScore = githubScoring.getStreakScore(maxStreak, currentStreak, activeDays);
        const commitsQualityScore = githubScoring.getCommitsQualityScore(commitsQualityReportArray);

        score = repoCountScore * 0.1 + followersCountScore * 0.025 + followingRatioScore * 0.025 + languagesCountScore * 0.05 + totalCommitsScore * 0.1 + forksCountScore * 0.1 + starsCountScore * 0.1 + profileReadmeScore * 0.1 + pinnedReposCountScore * 0.05 + pullRequestsCountScore * 0.1 + issuesCountScore * 0.1 + streakScore * 0.05 + commitsQualityScore * 0.1;

        try {
            await scoreModel.create({ username: username, score: score, platform: "Github" });
        } catch (error) {
            console.log('Failed to save github score:', error.message);
        }

        return res.status(200).json({
            score,
            avatarUrl: userData["avatar_url"],
            publicName: userData["name"],
            bio: userData["bio"],
            email: userData["email"],
            followersCount: userData["followers"],
            followingCount: userData["following"],
            public_repos: userData["public_repos"],
            lastYearCommitsCount,
            starsCount,
            forksCount,
            contributionCount,
            issueRequestsCount,
            pullRequestsCount,
            userReposStat,
            contributionCalendar,
            activeDays,
            currentStreak,
            maxStreak,
            languageUsageInBytes,
            githubContributionBadges,
            profileAnalysis,
        });

    } catch (error) {
        return handleError(res, error, "Couldn't retrieve user data");
    }
}


const analyzeLeetCode = async (req, res) => {
    try {
        const username = req.query.username;
        let score = 0;

        const problemsCount = await scrapeSpideyFetching.fetchLeetCodeProblemsCount(username);
        const submissionCalendar = await scrapeSpideyFetching.fetchLeetCodeUserSubmissionData(username, new Date().getFullYear());
        const contestData = await scrapeSpideyFetching.fetchLeetCodeContestData(username);
        const profileInfo = await scrapeSpideyFetching.fetchLeetCodeProfileData(username);
        const badges = await scrapeSpideyFetching.fetchLeetCodeBadgesData(username);
        const topicWiseProblems = await scrapeSpideyFetching.fetchLeetCodeTopicWiseProblemsData(username);

        const acceptanceRate = (problemsCount?.matchedUser?.submitStats?.acSubmissionNum?.[0]?.submissions || 0) / (problemsCount?.matchedUser?.submitStats?.totalSubmissionNum?.[0]?.submissions || 1);

        const leetCodeData = {
            problemsCount,
            submissionCalendar,
            contestData,
            profileInfo,
            badges,
            topicWiseProblems,
            acceptanceRate
        }

        const profileAnalysis = await getLeetCodeProfileAnalysis(leetCodeData);

        let acceptanceRateScore = leetCodeScoring.getAcceptanceRateScore(acceptanceRate);
        let badgesScore = leetCodeScoring.getBadgesScore(badges?.matchedUser);
        let contestScore = leetCodeScoring.getContestPerformanceScore(contestData);
        let problemsSolvedScore = leetCodeScoring.getProblemsSolvedCountScore(problemsCount?.matchedUser?.submitStats);
        let profileScore = leetCodeScoring.getProfileDataScore(profileInfo);
        let submissionConsistencyScore = leetCodeScoring.getSubmissionConsistencyScore(submissionCalendar?.matchedUser?.userCalendar);
        let topicWiseProblemsScore = leetCodeScoring.getTopicWiseProblemsScore(topicWiseProblems?.matchedUser?.tagProblemCounts);

        const contestBonus = contestScore >= 95 ? 10 + Math.max(0, contestScore - 95) * 4 : 0;

        score = acceptanceRateScore * 0.1 + badgesScore * 0.05 + submissionConsistencyScore * 0.25 + contestScore * 0.25 + problemsSolvedScore * 0.25 + profileScore * 0.05 + topicWiseProblemsScore * 0.05;

        score = Math.min(100, score + contestBonus);

        try {
            await scoreModel.create({ username: username, score: score, platform: "Leetcode" });
        } catch (error) {
            console.log('Failed to save leetcode score:', error.message);
        }

        return res.status(200).json({
            score,
            problemsCount,
            submissionCalendar,
            contestData,
            profileInfo,
            badges,
            topicWiseProblems,
            acceptanceRate,
            profileAnalysis
        });

    } catch (error) {
        return handleError(res, error, "Couldn't retrieve user data");
    }

}


const analyzeResume = async (req, res) => {
    try {
        const file = req.file;
        const experienceInYears = req.body.experienceInYears || "0 - 2 Years (New Grad)";
        const jobDescription = req.body.jobDescription || "";

        const validExperienceYearsRange = ["0 - 2 Years (New Grad)", "3 - 5 Years (Mid-Level)", "6 - 10 Years (Senior)", "10+ Years (Lead/Architect)"];

        if (!file) return res.status(400).json({ message: "Resume pdf not provided!" });
        if (file.mimetype != "application/pdf") return res.status(400).json({ message: "Resume should be in only pdf format!" });
        if (file.size > MAX_PDF_SIZE) return res.status(400).json({ message: `Size of resume should not surpass ${MAX_PDF_SIZE / (1024 * 1204)} MB!` });
        if (!validExperienceYearsRange.includes(experienceInYears)) return res.status(400).json({ message: `Invalid experience years range!` });

        const { noOfPages, pdfText } = await getPdfContent(file.path);
        if (noOfPages == 0) return res.status(500).json({ message: "Something went wrong while parsing pdf content! Try Again!" });

        const resumeAnalysis = await getResumeAnalysis({ resumeContent: pdfText, experienceInYears, noOfResumePages: noOfPages, jobDescription: jobDescription });

        if (Object.keys(resumeAnalysis).length == 0) return res.status(500).json({ "message": "Something Went Wrong while analyzing the resume" });

        const scoreAnalysis = resumeAnalysis["scoreAnalysis"];

        const resumeScoringWeights = {
            PROFESSIONALISM: 0.1,
            IMPACT: 0.1,
            ACHIEVEMENT: 0.15,
            COURSEWORK: 0.05,
            EDUCATION: (experienceInYears < 2) ? 0.1 : 0.05,
            EXPERIENCE: (experienceInYears < 2) ? 0.15 : 0.275,
            CONTACT: 0.05,
            PROJECT: (experienceInYears < 2) ? 0.2 : 0.125,
            TECHNICAL_SKILLS: 0.1,
        }

        const resumeScoringMultiplierWeights = {
            LOGICAL_FLOW: 0.4,
            RESUME_LENGTH: 0.6,
        }

        const professionalismScore = scoreAnalysis["professionalism"]["score"];
        const logicalFlowScore = scoreAnalysis["logicalFlow"]["score"];
        const resumeLengthScore = scoreAnalysis["resumeLength"]["score"];
        const impactScore = scoreAnalysis["impact"]["score"];
        const achievementScore = scoreAnalysis["section"]["achievements"]["score"];
        const courseworkScore = scoreAnalysis["section"]["coursework"]["score"];
        const educationScore = scoreAnalysis["section"]["education"]["score"];
        const experienceScore = scoreAnalysis["section"]["experience"]["score"];
        const contactScore = scoreAnalysis["section"]["contact"]["score"];
        const projectsScore = scoreAnalysis["section"]["projects"]["score"];
        const technicalSkillsScore = scoreAnalysis["section"]["technicalSkills"]["score"];
        const jobDescriptionScore = scoreAnalysis["jobDescription"]["score"];

        const baseScore = (professionalismScore * resumeScoringWeights.PROFESSIONALISM + contactScore * resumeScoringWeights.CONTACT + achievementScore * resumeScoringWeights.ACHIEVEMENT + courseworkScore * resumeScoringWeights.COURSEWORK + educationScore * resumeScoringWeights.EDUCATION + experienceScore * resumeScoringWeights.EXPERIENCE + projectsScore * resumeScoringWeights.PROJECT + technicalSkillsScore * resumeScoringWeights.TECHNICAL_SKILLS + impactScore * resumeScoringWeights.IMPACT);

        const scoreMultiplier = (logicalFlowScore * resumeScoringMultiplierWeights.LOGICAL_FLOW + resumeLengthScore * resumeScoringMultiplierWeights.RESUME_LENGTH) / 100;
        const jobDescriptionMatchMultiplier = jobDescriptionScore / 100;

        const score = baseScore * scoreMultiplier * jobDescriptionMatchMultiplier;
        resumeAnalysis["score"] = score;

        const platform = resumeAnalysis?.scoreAnalysis?.jobDescription?.isJobDescriptionGiven ? "Resume with JD" : "Generic Resume";
        try {
            await scoreModel.create({ userId: req.user?._id, score: score, platform });
        } catch (error) {
            console.log('Failed to save resume score:', error.message);
        }

        return res.status(200).json({ resumeAnalysis });

    } catch (error) {
        return handleError(res, error, "Couldn't retrieve user data");
    }
}


export {
    analyzeGithub,
    analyzeLeetCode,
    analyzeResume,
}