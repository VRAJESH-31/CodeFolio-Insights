import express from "express"
import { getUser, changePassword, updateUserInfo, addProfileView, updateLastRefresh, getUsers } from "../controllers/user.controller.js";
import { optionalAuth, protectRoute } from "../middlewares/auth.middleware.js";
import { getAnalytics } from "../middlewares/analytics.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import { checkAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get("/", protectRoute, checkAdmin, getUsers);
router.get("/:id", optionalAuth, getAnalytics, getUser);
router.patch("/", protectRoute, getAnalytics, upload.single("profileImage"), updateUserInfo);
router.patch("/password", protectRoute, getAnalytics, changePassword);
router.patch("/profile-view/:userId", protectRoute, getAnalytics, addProfileView);
router.patch("/last-refresh", protectRoute, getAnalytics, updateLastRefresh);

export default router;