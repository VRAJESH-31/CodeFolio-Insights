import apiLogs from "../models/apiLogs.model.js";

const getAnalytics = async (req, res, next) => {
    try {
        const userId = req.user?._id || null;
        const startTime = Date.now();

        res.on("finish", async ()=>{
            const duration = Date.now() - startTime;

            await apiLogs.create({
                userId : userId,
                endpoint: req.originalUrl,
                statusCode: res.statusCode,
                responseTime: duration,
            });
        })

        next();
    } catch (error) {
        console.log("Error in analytics middleware:", error.message);
        console.log(error.stack);
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

export {
    getAnalytics,
}