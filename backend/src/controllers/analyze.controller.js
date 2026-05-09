import asyncHandler from '../utils/async-handler.util.js';
import * as AnalyzeService from "../services/analyze.service.js";

const analyzeGithub = asyncHandler(async (req, res) => {
    const { username } = req.query;
    const response = await AnalyzeService.analyzeGithub(username);
    if (!response) throw new ApiError(404, "User not found");
    return res.status(200).json(response);
});

const analyzeLeetCode = asyncHandler(async (req, res) => {
    const { username } = req.query;
    const response = await AnalyzeService.analyzeLeetCode(username);
    if (!response) throw new ApiError(404, "User not found");
    return res.status(200).json(response);
});

const analyzeResume = asyncHandler(async (req, res) => {
    const { experienceInYears, jobDescription } = req.body;
    const response = await AnalyzeService.analyzeResume(req.file, experienceInYears, jobDescription, req.user?._id);
    return res.status(200).json(response);
});

export {
    analyzeGithub,
    analyzeLeetCode,
    analyzeResume,
}
