import apiLogs from "../models/apiLogs.model.js";
import handleError from '../utils/handleError.js';

const getAnalytics = async (req, res, next) => {
    try {
        const userId = req.user?._id || null;
        const startTime = Date.now();

        res.on("finish", async () => {
            const duration = Date.now() - startTime;

            await apiLogs.create({
                userId: userId,
                endpoint: req.originalUrl,
                statusCode: res.statusCode,
                responseTime: duration,
            });
        })

        next();
    } catch (error) {
        return handleError(res, error, "Internal Server Error!");
    }
}

export {
    getAnalytics,
}