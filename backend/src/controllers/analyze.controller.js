import * as githubScoring from "../utils/scoring/githubScore.js";
import * as githubFetching from "../utils/fetching/githubFetch.js"
import * as scrapeSpideyFetching from "../utils/fetching/scrapeSpideyFetch.js"
import { getGithubProfileAnalysis, getLeetCodeProfileAnalysis, getResumeAnalysis } from "../utils/geminiUtils.js";
import * as leetCodeScoring from "../utils/scoring/leetcodeScore.js";
import { getPdfContent } from "../utils/pdfUtils.js";
import scoreModel from "../models/score.model.js";
import redisClient from "../config/redis.js";
import asyncHandler from '../utils/asyncHandler.js';
import { getStreaksAndActiveDays } from "../utils/calendar.js";
import { getScoreComparison } from "../utils/score.js";


const analyzeGithub = asyncHandler(async (req, res) => {
    const username = req.query.username;
    let score = 0;


    // Checking if data is cached
    const cachedData = await redisClient.get(`profileAnalysis:github:${username}`);
    if (cachedData) return res.status(200).json(JSON.parse(cachedData));


    // Data Fetching
    const userData = await githubFetching.getUserProfileData(username);
    if (!userData) return res.status(404).json({ message: "User not found" });

    const [{ starsCount, forksCount }, pinnedRepos, lastYearContributionStats, contributionCalendar, contributionCount, profileReadme, contributionBadges, languageStats] = await Promise.all([
        githubFetching.getUserStarsAndForks(username),
        githubFetching.getGithubPinnedRepos(username),
        githubFetching.getLastYearContributionCalendar(username),
        githubFetching.getMultiYearContributionCalendar(username, new Date(userData.created_at).getFullYear(), new Date().getFullYear()),
        githubFetching.getMultiYearContributionCount(username, new Date(userData.created_at).getFullYear(), new Date().getFullYear()),
        githubFetching.getProfileReadme(username),
        githubFetching.getGithubContributionBadges(username),
        githubFetching.getUserLanguageStats(username)
    ]);

    const {currentStreak, maxStreak, activeDays, totalContributions} = getStreaksAndActiveDays(contributionCalendar);


    // Getting Analysis on some commits to calculate commits quality score
    const commitAnalysis = await githubFetching.getCommitsQualityReport(username);
    const commitsQualityReport = Object.values(commitAnalysis).map((commit) => commit["rating"]);


    // Scoring
    const repoCountScore = githubScoring.getRepoCountScore(userData.public_repos);
    const followersCountScore = githubScoring.getFollowersCountScore(userData.followers);
    const followingRatioScore = githubScoring.getFollowingRatioScore(userData.followers, userData.following);
    const languagesCountScore = githubScoring.getLanguagesCountScore(Object.entries(languageStats).length);
    const totalCommitsScore = githubScoring.getTotalCommitsScore(contributionCount.commitsCount);
    const pullRequestsCountScore = githubScoring.getPullRequestsCountScore(contributionCount.pullRequestsCount);
    const issuesCountScore = githubScoring.getIssuesCountScore(contributionCount.issuesCount);
    const forksCountScore = githubScoring.getForksCountScore(forksCount);
    const starsCountScore = githubScoring.getStarsCountScore(starsCount);
    const profileReadmeScore = await githubScoring.getProfileReadmeScore(profileReadme);
    const pinnedReposScore = githubScoring.getPinnedReposScore(pinnedRepos);
    const streakScore = githubScoring.getStreakScore(maxStreak, currentStreak, activeDays);
    const commitsQualityScore = githubScoring.getCommitsQualityScore(commitsQualityReport);

    score = repoCountScore * 0.1 + followersCountScore * 0.025 + followingRatioScore * 0.025 + languagesCountScore * 0.05 + totalCommitsScore * 0.1 + forksCountScore * 0.1 + starsCountScore * 0.1 + profileReadmeScore * 0.1 + pinnedReposScore * 0.05 + pullRequestsCountScore * 0.1 + issuesCountScore * 0.1 + streakScore * 0.05 + commitsQualityScore * 0.1;

    const scoreData = {
        overall: score,
        parameterWise: { repoCountScore, followersCountScore, followingRatioScore, languagesCountScore, totalCommitsScore, forksCountScore, starsCountScore, profileReadmeScore, pinnedReposScore, pullRequestsCountScore, issuesCountScore, streakScore, commitsQualityScore }
    }


    // Getting AI Analysis on Github Data
    const githubAnalysisContext = { userData, starsCount, forksCount, pinnedRepos, lastYearContributionStats, contributionCount, profileReadme, contributionBadges, languageStats, currentStreak, maxStreak, activeDays, totalContributions, commitAnalysis, scoreData }

    const profileAnalysis = await getGithubProfileAnalysis(githubAnalysisContext);


    // Saving Score and comparing with the existing score
    try {
        await scoreModel.create({ username: username, score: score, platform: "Github" });
    } catch (error) {
        console.log('Failed to save github score:', error.message);
        console.log(error.stack);
    }

    const scoreComparison = await getScoreComparison(score, "Github");


    // Returning the response and saving it in cache
    const response = { ...githubAnalysisContext, profileAnalysis, scoreData, scoreComparison }

    await redisClient.set(`profileAnalysis:github:${username}`, JSON.stringify(response), "EX", 10 * 60);

    return res.status(200).json(response);
    
});


const analyzeLeetCode = asyncHandler(async (req, res) => {
    const username = req.query.username;
    let score = 0;


    // Checking if data is cached
    const cachedData = await redisClient.get(`profileAnalysis:leetcode:${username}`);
    if (cachedData) return res.status(200).json(JSON.parse(cachedData));


    // LeetCode Data Fetching
    const problemsCount = await scrapeSpideyFetching.fetchLeetCodeProblemsCount(username);
    const submissionCalendar = await scrapeSpideyFetching.fetchLeetCodeUserSubmissionData(username, new Date().getFullYear());
    const contestData = await scrapeSpideyFetching.fetchLeetCodeContestData(username);
    const profileInfo = await scrapeSpideyFetching.fetchLeetCodeProfileData(username);
    const badges = await scrapeSpideyFetching.fetchLeetCodeBadgesData(username);
    const topicWiseProblems = await scrapeSpideyFetching.fetchLeetCodeTopicWiseProblemsData(username);

    const acceptanceRate = (problemsCount?.matchedUser?.submitStats?.acSubmissionNum?.[0]?.submissions || 0) / (problemsCount?.matchedUser?.submitStats?.totalSubmissionNum?.[0]?.submissions || 1);


    // Scoring
    let acceptanceRateScore = leetCodeScoring.getAcceptanceRateScore(acceptanceRate);
    let badgesScore = leetCodeScoring.getBadgesScore(badges?.matchedUser);
    let contestScore = leetCodeScoring.getContestPerformanceScore(contestData);
    let problemsSolvedScore = leetCodeScoring.getProblemsSolvedCountScore(problemsCount?.matchedUser?.submitStats);
    let profileScore = leetCodeScoring.getProfileDataScore(profileInfo);
    let submissionConsistencyScore = leetCodeScoring.getSubmissionConsistencyScore(submissionCalendar?.matchedUser?.userCalendar);
    let topicWiseProblemsScore = leetCodeScoring.getTopicWiseProblemsScore(topicWiseProblems?.matchedUser?.tagProblemCounts);

    score = acceptanceRateScore * 0.1 + badgesScore * 0.05 + submissionConsistencyScore * 0.25 + contestScore * 0.25 + problemsSolvedScore * 0.25 + profileScore * 0.05 + topicWiseProblemsScore * 0.05;

    const contestBonus = contestScore >= 95 ? 10 + Math.max(0, contestScore - 95) * 4 : 0;

    score = Math.min(100, score + contestBonus);

    const scoreData = { 
        overall: score, 
        parameterWise: { acceptanceRateScore, badgesScore, contestScore, problemsSolvedScore, profileScore, submissionConsistencyScore, topicWiseProblemsScore } 
    };


    // Getting AI Analysis on LeetCode Data
    const leetCodeAnalysisContext = { problemsCount, submissionCalendar, contestData, profileInfo, badges, topicWiseProblems, acceptanceRate, scoreData };
    const profileAnalysis = await getLeetCodeProfileAnalysis(leetCodeAnalysisContext);


    // Saving Score and comparing with the existing score
    try {
        await scoreModel.create({ username: username, score: score, platform: "Leetcode" });
    } catch (error) {
        console.log('Failed to save leetcode score:', error.message);
    }

    const scoreComparison = await getScoreComparison(score, "Leetcode");


    // Returning the response and saving it in cache
    const response = { ...leetCodeAnalysisContext, profileAnalysis, scoreData, scoreComparison }

    await redisClient.set(`profileAnalysis:leetcode:${username}`, JSON.stringify(response), "EX", 10 * 60);

    return res.status(200).json(response);
});


const analyzeResume = asyncHandler(async (req, res) => {
    const file = req.file;
    const experienceInYears = req.body.experienceInYears || "0 - 2 Years (New Grad)";
    const jobDescription = req.body.jobDescription || "";


    // Extracting the PDF Content
    const { noOfPages, pdfText } = await getPdfContent(file.path);
    if (noOfPages == 0) return res.status(500).json({ message: "Something went wrong while parsing pdf content! Try Again!" });


    // Getting AI Analysis on Resume Data
    const resumeAnalysis = await getResumeAnalysis({ resumeContent: pdfText, experienceInYears, noOfResumePages: noOfPages, jobDescription: jobDescription });

    if (Object.keys(resumeAnalysis).length == 0) return res.status(500).json({ "message": "Something Went Wrong while analyzing the resume" });


    // Scoring
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


    // Saving Score and comparing with the existing score
    const platform = resumeAnalysis?.scoreAnalysis?.jobDescription?.isJobDescriptionGiven ? "Resume with JD" : "Generic Resume";

    try {
        await scoreModel.create({ userId: req.user?._id, score: score, platform });
    } catch (error) {
        console.log('Failed to save resume score:', error.message);
    }

    const scoreComparison = await getScoreComparison(score, platform);

    return res.status(200).json({ resumeAnalysis, scoreComparison });
});


export {
    analyzeGithub,
    analyzeLeetCode,
    analyzeResume,
}
