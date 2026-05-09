import { Router } from "express";
import { getProfiles, refreshProfileData, getProfileCache, updateProfile } from "../controllers/profile.controller.js";
import { optionalAuth, protectRoute } from "../middlewares/auth.middleware.js";
import { getAnalytics } from "../middlewares/analytics.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { profileUpdateValidationSchema } from "../validators/profiles.validate.js";
import { displayNameValidationSchema } from "../validators/user.validate.js";
import { checkProfileVisibility } from "../middlewares/profile-visibility.middleware.js";

const router = Router();

router.get(
    "/fetch/:displayName",
    optionalAuth,
    getAnalytics,
    validate(displayNameValidationSchema),
    checkProfileVisibility,
    refreshProfileData
);

router.get(
    "/cache/:displayName",
    getAnalytics,
    optionalAuth,
    validate(displayNameValidationSchema),
    checkProfileVisibility,
    getProfileCache
);

router.get(
    "/:displayName",
    getAnalytics,
    optionalAuth,
    validate(displayNameValidationSchema),
    checkProfileVisibility,
    getProfiles
);

router.patch(
    "/platform",
    getAnalytics,
    protectRoute,
    validate(profileUpdateValidationSchema),
    updateProfile
);


export default router;