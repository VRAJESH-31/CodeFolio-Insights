import express from "express"
import { getAnalytics, getPerUserAnalytics, getUnAuthenticatedUserAnalytics } from "../controllers/analytics.controller.js";
import { checkAdmin } from "../middlewares/admin.middleware.js"
import { protectRoute } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { getAnalyticsValidationSchema, getPerUserAnalyticsValidationSchema, getUnAuthenticatedUserAnalyticsValidationSchema } from "../validators/analytics.validate.js";

const router = express.Router();

router.get("/", protectRoute, checkAdmin, validate(getAnalyticsValidationSchema), getAnalytics);
router.get("/:userId", protectRoute, checkAdmin, validate(getPerUserAnalyticsValidationSchema), getPerUserAnalytics);
router.get("/unauthenticated", protectRoute, checkAdmin, validate(getUnAuthenticatedUserAnalyticsValidationSchema), getUnAuthenticatedUserAnalytics);

export default router;