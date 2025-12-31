import apiLogsModel from "../models/apiLogs.model.js";
import UserModel from "../models/user.model.js";
import asyncHandler from '../utils/asyncHandler.js';

const getSummary = asyncHandler(async (req, res) => {
    const { startTime: start, endTime: end } = req.query;

    const [totalUsers, requestSummary, newUsers, totalIntervalRequests] = await Promise.all([
        UserModel.countDocuments(),
        apiLogsModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalRequests: { $sum: 1 },
                    success: { $sum: { $cond: [{ $lt: ["$statusCode", 400] }, 1, 0] } },
                    userFailure: { $sum: { $cond: [{ $and: [{ $gte: ["$statusCode", 400] }, { $lt: ["$statusCode", 500] }] }, 1, 0] } },
                    serverFailure: { $sum: { $cond: [{ $gte: ["$statusCode", 500] }, 1, 0] } }
                }
            }
        ]),
        UserModel.countDocuments({ createdAt: { $gte: start, $lte: end } }),
        apiLogsModel.countDocuments({ createdAt: { $gte: start, $lte: end } })
    ]);

    return res.status(200).json({
        allTime: {
            totalUsers,
            requestSummary: requestSummary[0] || { totalRequests: 0, success: 0, userFailure: 0, serverFailure: 0 }
        },
        interval: {
            newUsers,
            totalRequests: totalIntervalRequests
        }
    });
});

const getEndpointStats = asyncHandler(async (req, res) => {
    const { startTime: start, endTime: end } = req.query;

    const stats = await apiLogsModel.aggregate([
        { $match: { createdAt: { $gte: start, $lte: end } } },
        {
            $group: {
                _id: "$endpoint",
                totalRequests: { $sum: 1 },
                successCount: { $sum: { $cond: [{ $lt: ["$statusCode", 400] }, 1, 0] } },
                userFailure: { $sum: { $cond: [{ $and: [{ $gte: ["$statusCode", 400] }, { $lt: ["$statusCode", 500] }] }, 1, 0] } },
                serverFailure: { $sum: { $cond: [{ $gte: ["$statusCode", 500] }, 1, 0] } },
                avgResponseTime: { $avg: "$responseTime" },
                maxResponseTime: { $max: "$responseTime" },
                minResponseTime: { $min: "$responseTime" }
            }
        },
        { $sort: { totalRequests: -1 } }
    ]);

    return res.status(200).json(stats);
});

const getUserStats = asyncHandler(async (req, res) => {
    const { startTime: start, endTime: end } = req.query;

    const stats = await apiLogsModel.aggregate([
        { $match: { createdAt: { $gte: start, $lte: end }, userId: { $ne: null } } },
        {
            $group: {
                _id: "$userId",
                requestCount: { $sum: 1 }
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "userInfo"
            }
        },
        { $unwind: "$userInfo" },
        {
            $project: {
                userId: "$_id",
                name: "$userInfo.name",
                email: "$userInfo.email",
                requestCount: 1
            }
        },
        { $sort: { requestCount: -1 } },
        { $limit: 20 }
    ]);

    return res.status(200).json(stats);
});

const getIpStats = asyncHandler(async (req, res) => {
    const { startTime: start, endTime: end } = req.query;

    const stats = await apiLogsModel.aggregate([
        { $match: { createdAt: { $gte: start, $lte: end } } },
        {
            $group: {
                _id: "$ipAddress",
                requestCount: { $sum: 1 }
            }
        },
        { $sort: { requestCount: -1 } },
        { $limit: 20 }
    ]);

    return res.status(200).json(stats);
});

const getTimeSeriesStats = asyncHandler(async (req, res) => {
    const { startTime: start, endTime: end } = req.query;
    const durationMs = end - start;

    let granularity = "%Y-%m-%dT%H:%M:00"; // minute
    if (durationMs > 7 * 24 * 60 * 60 * 1000) {
        granularity = "%Y-%m-%d"; // day
    } else if (durationMs > 24 * 60 * 60 * 1000) {
        granularity = "%Y-%m-%dT%H:00:00"; // hour
    }

    const stats = await apiLogsModel.aggregate([
        { $match: { createdAt: { $gte: start, $lte: end } } },
        {
            $group: {
                _id: { $dateToString: { format: granularity, date: "$createdAt" } },
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
    ]);

    return res.status(200).json(stats);
});

const getUserAgentStats = asyncHandler(async (req, res) => {
    const { startTime: start, endTime: end } = req.query;

    const [allTime, interval] = await Promise.all([
        apiLogsModel.aggregate([
            { $group: { _id: "$userAgent", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]),
        apiLogsModel.aggregate([
            { $match: { createdAt: { $gte: start, $lte: end } } },
            { $group: { _id: "$userAgent", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ])
    ]);

    return res.status(200).json({ allTime, interval });
});

export {
    getSummary,
    getEndpointStats,
    getUserStats,
    getIpStats,
    getTimeSeriesStats,
    getUserAgentStats
};
