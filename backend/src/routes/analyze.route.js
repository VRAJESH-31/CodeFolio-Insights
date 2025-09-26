import express from "express"
import { analyzeGithub, analyzeLeetCode, analyzeResume } from "../controllers/analyze.controller.js";

const router = express.Router();

router.get("/github", analyzeGithub);
router.get("/leetcode", analyzeLeetCode);
router.post("/resume", analyzeResume);

export default router;