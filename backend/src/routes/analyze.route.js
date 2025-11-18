import express from "express"
import { analyzeGithub, analyzeLeetCode, analyzeResume } from "../controllers/analyze.controller.js";
import { getAnalytics } from "../middlewares/analytics.middleware.js";
import { optionalAuth } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/github", optionalAuth, getAnalytics, analyzeGithub);
router.get("/leetcode", optionalAuth, getAnalytics, analyzeLeetCode);
router.post("/resume", optionalAuth, getAnalytics, upload.single("resume"), analyzeResume);

export default router;