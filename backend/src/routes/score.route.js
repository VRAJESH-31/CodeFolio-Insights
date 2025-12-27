import express from "express"
import { optionalAuth, protectRoute } from "../middlewares/auth.middleware.js";
import { getAnalytics } from "../middlewares/analytics.middleware.js";
import { getPlatformScoreStats, getUserScoreHistory, saveScore } from "../controllers/score.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { saveScoreValidationSchema, getPlatformScoreStatsValidationSchema, getUserScoreHistoryValidationSchema } from "../validators/score.validate.js";

const router = express.Router();

router.post("/", optionalAuth, getAnalytics, validate(saveScoreValidationSchema), saveScore);
router.get("/platform-score-stats", optionalAuth, getAnalytics, validate(getPlatformScoreStatsValidationSchema), getPlatformScoreStats);
router.get("/score-history", protectRoute, getAnalytics, validate(getUserScoreHistoryValidationSchema), getUserScoreHistory);

export default router;