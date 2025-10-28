import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    googleId: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    jobTitle: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    profile: {
        type: String,
    },
    bio: {
        type: String,
        trim: true,
    },
    profileVisibility: {
        type: Boolean,
        default: true,
    },
    lastRefresh: {
        type: Date,
        default: Date.now(),
    },
    profileViews: {
        type: Number,
        default: 0,
    }
}, {timestamps: true});

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;