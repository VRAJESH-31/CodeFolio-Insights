import express from "express"
import { getUser, changePassword, updateUserInfo, addProfileView, updateLastRefresh } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getAnalytics } from "../middlewares/analytics.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/", getAnalytics, getUser);
router.patch("/", protectRoute, getAnalytics, upload.single("profileImage"), updateUserInfo);
router.patch("/password", protectRoute, getAnalytics, changePassword);
router.patch("/profile-view", protectRoute, getAnalytics, addProfileView);
router.patch("/last-refresh", protectRoute, getAnalytics, updateLastRefresh);

export default router;