import mongoose from "mongoose";

const apiLogsSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Types.ObjectId,
        ref: "users",
        require: true,
    },
    endpoint : {
        type: String,
        required: true,
    },
    statusCode : {
        type : Number,
        required: true,
    },
    responseTime : {
        type: Number,
        required: true,
    },
}, {timestamps: true});

const apiLogs = mongoose.model("ApiLog", apiLogsSchema);

export default apiLogs;