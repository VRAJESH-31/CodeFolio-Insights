import express from "express";
import { analyzeGithub, analyzeLeetCode, analyzeResume } from "../controllers/analyze.controller.js";
import { optionalAuth, protectRoute } from "../middlewares/auth.middleware.js";
import { getAnalytics } from "../middlewares/analytics.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { usernameValidationSchema } from "../validators/user.validate.js";
import { resumeAnalyzerValidationSchema } from "../validators/analyzer.validate.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/github", optionalAuth, getAnalytics, validate(usernameValidationSchema), analyzeGithub);
router.get("/leetcode", optionalAuth, getAnalytics, validate(usernameValidationSchema), analyzeLeetCode);
router.post("/resume", protectRoute, getAnalytics, upload.single("resume"), validate(resumeAnalyzerValidationSchema), analyzeResume);

export default router;
