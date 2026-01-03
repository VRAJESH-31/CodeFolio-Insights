import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Types.ObjectId,
        ref: "users",
    },
    username : {
        type: String,
    },
    score: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    platform: {
        type: String,
        required: true,
        enum: ["Leetcode", "Github", "Generic Resume", "Resume with JD"],
    },
}, {timestamps: true});

const scoreModel = mongoose.model("score", scoreSchema);

export default scoreModel;