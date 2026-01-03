import mongoose from "mongoose";

const profileViewSchema = new mongoose.Schema({
    viewerId: {
        type: mongoose.Types.ObjectId,
        ref: "users",
    },
    viewerDeviceToken: {
        type: String,
    },
    vieweeId: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true,
    },
    viewerType: {
        type: String,
        enum: ["user", "guest"],
        default: "guest",
    },
    lastSeenAt: {
        type: Date,
        default: Date.now,
    },
    count: {
        type: Number,
        default: 1,
    }
}, { timestamps: true });

const ProfileViewModel = mongoose.model('profileView', profileViewSchema);

export default ProfileViewModel;