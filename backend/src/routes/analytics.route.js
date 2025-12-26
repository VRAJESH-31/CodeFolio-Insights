import express from "express"
import { getAnalytics, getPerUserAnalytics, getUnAuthenticatedUserAnalytics } from "../controllers/analytics.controller.js";
import { checkAdmin } from "../middlewares/admin.middleware.js"
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, checkAdmin, getAnalytics);
router.get("/:userId", protectRoute, checkAdmin, getPerUserAnalytics);
router.get("/unauthenticated", protectRoute, checkAdmin, getUnAuthenticatedUserAnalytics);

export default router;