import apiLogsModel from "../models/apiLogs.model.js";
import handleError from '../utils/handleError.js';

const getAnalytics = async (req, res) => {
    try {
        const isAdmin = req.isAdmin;
        const interval = req.query.interval || 24 * 60 * 60 * 1000;
        const currentTime = Date.now();

        if (!isAdmin) return res.status(403).json({ message: "You are not authorized to access this service." });

        const apiLogs = await apiLogsModel.find({ createdAt: { $gt: currentTime - interval } });
        return res.status(200).json(apiLogs);
    } catch (error) {
        return handleError(res, error, "Internal Server Error!");
    }
}

const getPerUserAnalytics = async (req, res) => {
    try {
        const isAdmin = req.isAdmin;
        const interval = req.query.interval || 24 * 60 * 60 * 1000;
        const currentTime = Date.now();
        const userId = req.params.userId;

        if (!isAdmin) return res.status(403).json({ message: "You are not authorized to access this service." });

        const apiLogs = await apiLogsModel.find({ userId: userId, createdAt: { $gt: currentTime - interval } });
        return res.status(200).json(apiLogs);
    } catch (error) {
        return handleError(res, error, "Internal Server Error!");
    }
}

const getUnAuthenticatedUserAnalytics = async (req, res) => {
    try {
        const isAdmin = req.isAdmin;
        const interval = req.query.interval || 24 * 60 * 60 * 1000;
        const currentTime = Date.now();

        if (!isAdmin) return res.status(403).json({ message: "You are not authorized to access this service." });

        const apiLogs = await apiLogsModel.find({ userId: null, createdAt: { $gt: currentTime - interval } });
        return res.status(200).json(apiLogs);
    } catch (error) {
        return handleError(res, error, "Internal Server Error!");
    }
}

export {
    getAnalytics,
    getPerUserAnalytics,
    getUnAuthenticatedUserAnalytics
}