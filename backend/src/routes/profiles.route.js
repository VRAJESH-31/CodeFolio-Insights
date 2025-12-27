import { Router } from "express";
import { getProfiles, updateProfiles, refreshProfileData, getProfileCache, updateProfile } from "../controllers/profiles.controller.js";
import { optionalAuth, protectRoute } from "../middlewares/auth.middleware.js";
import { getAnalytics } from "../middlewares/analytics.middleware.js";

const router = Router();


router.route("/:userId").get(optionalAuth, getAnalytics, getProfiles);
router.route("/").patch(protectRoute, getAnalytics, updateProfiles);
router.route("/platform").patch(protectRoute, getAnalytics, updateProfile);
router.route("/fetch/:userId").get(optionalAuth, getAnalytics, refreshProfileData);
router.route("/cache/:userId").get(optionalAuth, getAnalytics, getProfileCache);

export default router;