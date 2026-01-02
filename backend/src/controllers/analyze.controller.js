import { getPdfContent } from "../utils/pdfUtils.js";
import scoreModel from "../models/score.model.js";
import redisClient from "../config/redis.js";
import asyncHandler from '../utils/asyncHandler.js';
import { getScoreComparison, savePlatformScore } from "../utils/score.js";
import { getAnalysisGithubData, getAnalysisLeetCodeData, getGithubScore, getLeetCodeScore } from "../services/analyze.service.js";
import { getGithubProfileAnalysis, getLeetCodeProfileAnalysis, getResumeAnalysis } from "../utils/geminiUtils.js";


const analyzeGithub = asyncHandler(async (req, res) => {
    const username = req.query.username;


    // Checking if data is cached
    const cachedData = await redisClient.get(`profileAnalysis:github:${username}`);
    if (cachedData) return res.status(200).json(JSON.parse(cachedData));


    // Data Fetching
    const githubData = await getAnalysisGithubData(username);
    if (!githubData) return res.status(404).json({ message: "User not found" });


    // Scoring
    const scoreData = await getGithubScore(githubData);


    // Getting AI Analysis on Github Data
    const githubAnalysisContext = { ...githubData, scoreData }
    const profileAnalysis = await getGithubProfileAnalysis(githubAnalysisContext);


    // Saving Score and comparing with the existing score
    await savePlatformScore(scoreData.overall, "Github", username);
    const scoreComparison = await getScoreComparison(scoreData.overall, "Github");


    // Returning the response and saving it in cache
    const response = { ...githubAnalysisContext, profileAnalysis, scoreData, scoreComparison }
    await redisClient.set(`profileAnalysis:github:${username}`, JSON.stringify(response), "EX", 10 * 60);

    return res.status(200).json(response);

});


const analyzeLeetCode = asyncHandler(async (req, res) => {
    const username = req.query.username;


    // Checking if data is cached
    const cachedData = await redisClient.get(`profileAnalysis:leetcode:${username}`);
    if (cachedData) return res.status(200).json(JSON.parse(cachedData));


    // LeetCode Data Fetching
    const leetCodeData = await getAnalysisLeetCodeData(username);
    if (!leetCodeData) return res.status(404).json({ message: "User not found" });


    // Scoring
    const scoreData = await getLeetCodeScore(leetCodeData);


    // Getting AI Analysis on LeetCode Data
    const leetCodeAnalysisContext = { ...leetCodeData, scoreData };
    delete leetCodeAnalysisContext.multiYearSubmissionCalendar;
    const profileAnalysis = await getLeetCodeProfileAnalysis(leetCodeAnalysisContext);


    // Saving Score and comparing with the existing score
    await savePlatformScore(scoreData.overall, "Leetcode", username);
    const scoreComparison = await getScoreComparison(scoreData.overall, "Leetcode");


    // Returning the response and saving it in cache
    const response = { ...leetCodeData, profileAnalysis, scoreData, scoreComparison }
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
