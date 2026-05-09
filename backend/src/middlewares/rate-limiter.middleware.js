import ApiPointsModel from "../models/api-points.model.js";
import ApiProjectModel from "../models/api-project.model.js";
import { getApiCost } from "../utils/api-cost.util.js";
import asyncHandler from "../utils/async-handler.util.js";
import rateLimit from "express-rate-limit";
import ApiError from "../utils/api-error.util.js";

const publicApiRateLimiter = asyncHandler(async (req, res, next) => {
    const { apiKey } = req.query;
    if (!apiKey) throw new ApiError(401, "API Key is required!");

    const project = await ApiProjectModel.findOne({ apiKey });
    if (!project) throw new ApiError(401, "Invalid API Key!");

    const apiCost = getApiCost(req.originalUrl);
    const date = new Date().toISOString().split("T")[0];

    let apiPoint = await ApiPointsModel.findOne({ apiKey, date });

    if (!apiPoint) {
        apiPoint = await ApiPointsModel.create({
            apiKey,
            date,
            apiPointsUsed: apiCost,
            requestsMade: 1,
        })

        if (!apiPoint) throw new ApiError(400, "Something went wrong!");
        next();
    } else if (apiPoint.apiPointsUsed >= project.apiPointsDailyLimit) {
        throw new ApiError(429, "Rate limit exceeded!");
    } else {
        apiPoint.apiPointsUsed += apiCost;
        apiPoint.requestsMade += 1;
        await apiPoint.save();
        next();
    }
});

const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login requests per window
    message: { message: "Too many login attempts, please try again after 15 minutes" },
    standardHeaders: true,
    legacyHeaders: false,
});

export {
    publicApiRateLimiter,
    loginRateLimiter,
}
