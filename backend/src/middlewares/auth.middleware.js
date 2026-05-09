import { JWT_SECRET } from '../config/env.config.js';
import UserModel from '../models/user.model.js';
import jwt from "jsonwebtoken";
import asyncHandler from '../utils/async-handler.util.js';
import ApiError from '../utils/api-error.util.js';

const protectRoute = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new ApiError(401, "Unauthenticated User! Token not provided");

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const user = await UserModel.findById(decodedToken.user.id).select("-password");
        if (!user) throw new ApiError(404, "User not found");

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new ApiError(401, 'Session expired, please login again');
        }
        throw new ApiError(401, 'Invalid token, Login again');
    }
});

const optionalAuth = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        req.user = null;
    } else {
        try {
            const decodedToken = jwt.verify(token, JWT_SECRET);
            const user = await UserModel.findById(decodedToken.user.id).select("-password");

            if (!user) req.user = null;
            else req.user = user;
        } catch (error) {
            req.user = null;
        }
    }

    next();
});

export {
    protectRoute,
    optionalAuth,
};