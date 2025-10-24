import express from "express"
import { getAdminAnalytics } from "../controllers/analytics.controller.js";
import { checkAdmin } from "../middlewares/admin.middleware.js"
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, checkAdmin, getAdminAnalytics);

export default router;