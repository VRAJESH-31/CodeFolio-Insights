import express from "express"
import { getUser, changePassword, updateUserInfo, addProfileView, updateLastRefresh, getUsers } from "../controllers/user.controller.js";
import { optionalAuth, protectRoute } from "../middlewares/auth.middleware.js";
import { getAnalytics } from "../middlewares/analytics.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import { checkAdmin } from "../middlewares/admin.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { getUserValidationSchema, getUsersValidationSchema, updateUserInfoValidationSchema, changePasswordValidationSchema, addProfileViewValidationSchema } from "../validators/user.validate.js";

const router = express.Router();

router.get("/", protectRoute, checkAdmin, validate(getUsersValidationSchema), getUsers);
router.get("/:id", optionalAuth, getAnalytics, validate(getUserValidationSchema), getUser);
router.patch("/", protectRoute, getAnalytics, upload.single("profileImage"), validate(updateUserInfoValidationSchema), updateUserInfo);
router.patch("/password", protectRoute, getAnalytics, validate(changePasswordValidationSchema), changePassword);
router.patch("/profile-view/:userId", protectRoute, getAnalytics, validate(addProfileViewValidationSchema), addProfileView);
router.patch("/last-refresh", protectRoute, getAnalytics, updateLastRefresh);

export default router;