import { JWT_SECRET } from '../config/config.js';
import UserModel from '../models/user.model.js';
import jwt from "jsonwebtoken";
import asyncHandler from '../utils/asyncHandler.js';

export const protectRoute = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Unauthenticated User! Token not provided" });

    const decodedToken = jwt.verify(token, JWT_SECRET);

    const user = await UserModel.findById(decodedToken.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
});

export const optionalAuth = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        req.user = null;
    } else {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const user = await UserModel.findById(decodedToken.user.id).select("-password");

        if (!user) req.user = null;
        else req.user = user;
    }

    next();
});