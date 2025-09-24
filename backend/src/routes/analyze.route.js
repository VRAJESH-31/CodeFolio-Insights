import express from "express"
import { analyzeGithub, analyzeLeetCode } from "../controllers/analyze.controller.js";

const router = express.Router();

router.get("/github", analyzeGithub);
router.get("/leetcode", analyzeLeetCode);

export default router;