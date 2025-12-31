import express from "express"
import { getUser, changePassword, updateUserInfo, getUsers } from "../controllers/user.controller.js";
import { optionalAuth, protectRoute } from "../middlewares/auth.middleware.js";
import { getAnalytics } from "../middlewares/analytics.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import { checkAdmin } from "../middlewares/admin.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {  usersQueryValidationSchema, userInfoUpdateValidationSchema, changePasswordValidationSchema, userIdValidationSchema } from "../validators/user.validate.js";

const router = express.Router();

router.get("/", protectRoute, checkAdmin, validate(usersQueryValidationSchema), getUsers);
router.get("/:userId", optionalAuth, getAnalytics, validate(userIdValidationSchema), getUser);
router.patch("/", protectRoute, getAnalytics, upload.single("profileImage"), validate(userInfoUpdateValidationSchema), updateUserInfo);
router.patch("/password", protectRoute, getAnalytics, validate(changePasswordValidationSchema), changePassword);

export default router;