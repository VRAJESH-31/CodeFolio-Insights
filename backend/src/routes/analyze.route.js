import express from "express"
import { analyzeGithub, analyzeLeetCode, analyzeResume } from "../controllers/analyze.controller.js";
import { getAnalytics } from "../middlewares/analytics.middleware.js";
import { optionalAuth } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { resumeAnalyzerValidationSchema, githubAnalyzerValidationSchema, leetcodeAnalyzerValidationSchema } from "../validators/analyzer.validate.js";

const router = express.Router();

router.get("/github", optionalAuth, getAnalytics, validate(githubAnalyzerValidationSchema), analyzeGithub);
router.get("/leetcode", optionalAuth, getAnalytics, validate(leetcodeAnalyzerValidationSchema), analyzeLeetCode);
router.post("/resume", optionalAuth, getAnalytics, upload.single("resume"), validate(resumeAnalyzerValidationSchema), analyzeResume);

export default router;