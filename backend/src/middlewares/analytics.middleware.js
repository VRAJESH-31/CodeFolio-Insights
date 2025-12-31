import apiLogs from "../models/apiLogs.model.js";
import asyncHandler from '../utils/asyncHandler.js';

const getAnalytics = asyncHandler(async (req, res, next) => {
    const userId = req.user?._id || null;
    const startTime = Date.now();

    res.on("finish", async () => {
        const duration = Date.now() - startTime;

        await apiLogs.create({
            userId: userId,
            endpoint: req.originalUrl,
            method: req.method,
            statusCode: res.statusCode,
            responseTime: duration,
            ipAddress: req.ip || req.connection.remoteAddress,
            userAgent: req.get('user-agent'),
        });
    })

    next();
});

export {
    getAnalytics,
}