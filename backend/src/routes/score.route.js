import express from "express"
import { optionalAuth, protectRoute } from "../middlewares/auth.middleware.js";
import { getAnalytics } from "../middlewares/analytics.middleware.js";
import { getPlatformScoreStats, getUserScoreHistory, saveScore } from "../controllers/score.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { bodyScoreValidationSchema, queryScoreValidationSchema, userScoreHistoryValidationSchema } from "../validators/score.validate.js";

const router = express.Router();

router.post("/", optionalAuth, getAnalytics, validate(bodyScoreValidationSchema), saveScore);
router.get("/platform-score-stats", optionalAuth, getAnalytics, validate(queryScoreValidationSchema), getPlatformScoreStats);
router.get("/score-history", protectRoute, getAnalytics, validate(userScoreHistoryValidationSchema), getUserScoreHistory);

export default router;