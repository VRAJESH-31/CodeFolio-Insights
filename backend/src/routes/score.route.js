import express from "express"
import { optionalAuth } from "../middlewares/auth.middleware.js";
import { getAnalytics } from "../middlewares/analytics.middleware.js";
import { getUserScoreHistory } from "../controllers/score.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { userScoreHistoryValidationSchema } from "../validators/score.validate.js";

const router = express.Router();

router.get("/score-history", optionalAuth, getAnalytics, validate(userScoreHistoryValidationSchema), getUserScoreHistory);

export default router;