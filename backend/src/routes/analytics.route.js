import express from "express"
import { getSummary, getEndpointStats, getUserStats, getIpStats, getTimeSeriesStats, getUserAgentStats } from "../controllers/analytics.controller.js";
import { checkAdmin } from "../middlewares/admin.middleware.js"
import { protectRoute } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { analyticsValidationSchemas } from "../validators/analytics.validate.js";

const router = express.Router();

router.get("/", protectRoute, checkAdmin, validate(analyticsValidationSchemas), getSummary);
router.get("/endpoints", protectRoute, checkAdmin, validate(analyticsValidationSchemas), getEndpointStats);
router.get("/users", protectRoute, checkAdmin, validate(analyticsValidationSchemas), getUserStats);
router.get("/ips", protectRoute, checkAdmin, validate(analyticsValidationSchemas), getIpStats);
router.get("/time-series", protectRoute, checkAdmin, validate(analyticsValidationSchemas), getTimeSeriesStats);
router.get("/user-agents", protectRoute, checkAdmin, validate(analyticsValidationSchemas), getUserAgentStats);

export default router;