import express from "express"
import { getAnalytics } from "../controllers/analytics.controller.js";
import { checkAdmin } from "../middlewares/admin.middleware.js"
import { protectRoute } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { analyticsValidationSchemas } from "../validators/analytics.validate.js";

const router = express.Router();

router.get("/", protectRoute, checkAdmin, validate(analyticsValidationSchemas), getAnalytics);

export default router;