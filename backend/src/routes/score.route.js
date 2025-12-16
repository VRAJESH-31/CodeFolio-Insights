import express from "express"
import { optionalAuth, protectRoute } from "../middlewares/auth.middleware.js";
import { getAnalytics } from "../middlewares/analytics.middleware.js";
import { getPlatformScoreStats, getUserScoreHistory, saveScore } from "../controllers/score.controller.js";

const router = express.Router();

router.post("/", optionalAuth, getAnalytics, saveScore);
router.get("/platform-score-stats", optionalAuth, getAnalytics, getPlatformScoreStats);
router.get("/score-history", protectRoute, getAnalytics, getUserScoreHistory);

export default router;