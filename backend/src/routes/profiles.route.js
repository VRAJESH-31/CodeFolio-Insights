import express from "express"
import { getProfiles, updateProfiles, fetchProfilesData } from "../controllers/profiles.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getAnalytics } from "../middlewares/analytics.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getAnalytics, getProfiles);
router.patch("/", protectRoute,  getAnalytics, updateProfiles);
router.get("/fetch", getAnalytics, fetchProfilesData);

export default router;