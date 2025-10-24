import apiLogsModel from "../models/apiLogs.model.js";

const getAdminAnalytics = async (req, res) => {
    try {
        const isAdmin = req.isAdmin;
        const interval = req.query.interval || 24*60*60*1000;
        const currentTime = Date.now();

        if (!isAdmin) return res.status(403).json({message : "You are not authorized to access this service."});

        const apiLogs = await apiLogsModel.find({createdAt: {$gt : currentTime-interval}});
        return res.status(200).json(apiLogs);
    } catch (error) {
        console.log("Error in getAnalytics function:", error.message);
        console.log(error.stack);
        return res.status(500).json({message: "Internal Sever Error!"})
    }
}

export {
    getAdminAnalytics,
}