import apiLogsModel from "../models/apiLogs.model.js";

const getAnalytics = async (req, res) => {
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

const getPerUserAnalytics = async (req, res) => {
    try {
        const isAdmin = req.isAdmin;
        const interval = req.query.interval || 24*60*60*1000;
        const currentTime = Date.now();
        const userId = req.params.userId;

        if (!isAdmin) return res.status(403).json({message : "You are not authorized to access this service."});

        const apiLogs = await apiLogsModel.find({userId:userId, createdAt: {$gt : currentTime-interval}});
        return res.status(200).json(apiLogs);
    } catch (error){
        console.log("Error in getPerUserAnalytics function:", error.message);
        console.log(error.stack);
        return res.status(500).json({message: "Internal Sever Error!"})
    }
}

const getUnAuthenticatedUserAnalytics = async (req, res) => {
    try {
        const isAdmin = req.isAdmin;
        const interval = req.query.interval || 24*60*60*1000;
        const currentTime = Date.now();

        if (!isAdmin) return res.status(403).json({message : "You are not authorized to access this service."});

        const apiLogs = await apiLogsModel.find({userId:null, createdAt: {$gt : currentTime-interval}});
        return res.status(200).json(apiLogs);
    } catch (error){
        console.log("Error in getUnAuthenticatedUserAnalytics function:", error.message);
        console.log(error.stack);
        return res.status(500).json({message: "Internal Sever Error!"})
    }
}

export {
    getAnalytics,
    getPerUserAnalytics,
    getUnAuthenticatedUserAnalytics
}