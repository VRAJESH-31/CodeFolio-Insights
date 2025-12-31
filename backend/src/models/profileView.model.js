import mongoose from "mongoose";

const profileViewSchema = new mongoose.Schema({
    viewerIp : {
        type: String,
        required: true,
    },
    viewerId: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true,
    },
    vieweeId: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true,
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