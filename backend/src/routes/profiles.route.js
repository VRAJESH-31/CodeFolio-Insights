import { Router } from "express";
import { getProfiles, updateProfiles, refreshProfileData, getProfileCache, updateProfile } from "../controllers/profiles.controller.js";
import { optionalAuth, protectRoute } from "../middlewares/auth.middleware.js";
import { getAnalytics } from "../middlewares/analytics.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { getProfileValidationSchema, updateProfileValidationSchema, updateProfilesValidationSchema, refreshProfileValidationSchema, getProfileCacheValidationSchema } from "../validators/profiles.validate.js";

const router = Router();

router.route("/platform").patch(protectRoute, getAnalytics, validate(updateProfileValidationSchema), updateProfile);
router.route("/fetch/:userId").get(optionalAuth, getAnalytics, validate(refreshProfileValidationSchema), refreshProfileData);
router.route("/cache/:userId").get(optionalAuth, getAnalytics, validate(getProfileCacheValidationSchema), getProfileCache);
router.route("/:userId").get(optionalAuth, getAnalytics, validate(getProfileValidationSchema), getProfiles);
router.route("/").patch(protectRoute, getAnalytics, validate(updateProfilesValidationSchema), updateProfiles);

export default router;