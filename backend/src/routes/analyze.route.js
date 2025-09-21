import express from "express"
import { analyzeGithub } from "../controllers/analyze.controller.js";

const router = express.Router();

router.get("/github", analyzeGithub);

export default router;