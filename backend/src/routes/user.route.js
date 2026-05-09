import express from "express"
import { getUser, getUserHighlights, changePassword, updateUserInfo, updateDisplayName, getUsers, toggleProfileVisibility, toggle2FA, updateUserApiKey } from "../controllers/user.controller.js";
import { optionalAuth, protectRoute } from "../middlewares/auth.middleware.js";
import { getAnalytics } from "../middlewares/analytics.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import { checkAdmin } from "../middlewares/admin.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { usersQueryValidationSchema, userInfoUpdateValidationSchema, changePasswordValidationSchema, displayNameValidationSchema, displayNameUpdateValidationSchema } from "../validators/user.validate.js";
import { apiKeyBodyValidationSchema } from "../validators/common.validate.js"
import { checkProfileVisibility } from "../middlewares/profile-visibility.middleware.js";

const router = express.Router();

router.get(
    "/", 
    getAnalytics,
    protectRoute, 
    checkAdmin, 
    validate(usersQueryValidationSchema), 
    getUsers
);

router.get(
    "/highlights", 
    getAnalytics,
    getUserHighlights
);

router.get(
    "/:displayName", 
    getAnalytics, 
    optionalAuth, 
    validate(displayNameValidationSchema), 
    checkProfileVisibility,
    getUser
);

router.patch(
    "/", 
    getAnalytics, 
    protectRoute, 
    upload.single("profileImage"), 
    validate(userInfoUpdateValidationSchema), 
    updateUserInfo
);

router.patch(
    "/display-name", 
    getAnalytics, 
    protectRoute, 
    validate(displayNameUpdateValidationSchema), 
    updateDisplayName
);

router.patch(
    "/password", 
    getAnalytics, 
    protectRoute, 
    validate(changePasswordValidationSchema), 
    changePassword
);

router.patch(
    "/visibility", 
    getAnalytics, 
    protectRoute, 
    toggleProfileVisibility
);

router.patch(
    "/2fa", 
    getAnalytics, 
    protectRoute, 
    toggle2FA
);

router.patch(
    "/api-key", 
    getAnalytics, 
    protectRoute, 
    validate(apiKeyBodyValidationSchema),
    updateUserApiKey
);

export default router;