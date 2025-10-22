import express from "express"
import { analyzeGithub, analyzeLeetCode, analyzeResume } from "../controllers/analyze.controller.js";
import { getAnalytics } from "../middlewares/analytics.middleware.js";

const router = express.Router();

router.get("/github", getAnalytics, analyzeGithub);
router.get("/leetcode", getAnalytics, analyzeLeetCode);
router.post("/resume", getAnalytics, analyzeResume);

export default router;