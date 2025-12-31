import { Router } from "express";
import { getProfiles, updateProfiles, refreshProfileData, getProfileCache, updateProfile } from "../controllers/profiles.controller.js";
import { optionalAuth, protectRoute } from "../middlewares/auth.middleware.js";
import { getAnalytics } from "../middlewares/analytics.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { profileUpdateValidationSchema, profilesUpdateValidationSchema } from "../validators/profiles.validate.js";
import { userIdValidationSchema } from "../validators/user.validate.js";

const router = Router();

router.route("/fetch/:userId").get(optionalAuth, getAnalytics, validate(userIdValidationSchema), refreshProfileData);
router.route("/cache/:userId").get(optionalAuth, getAnalytics, validate(userIdValidationSchema), getProfileCache);
router.route("/:userId").get(optionalAuth, getAnalytics, validate(userIdValidationSchema), getProfiles);
router.route("/platform").patch(protectRoute, getAnalytics, validate(profileUpdateValidationSchema), updateProfile);
router.route("/").patch(protectRoute, getAnalytics, validate(profilesUpdateValidationSchema), updateProfiles);

export default router;