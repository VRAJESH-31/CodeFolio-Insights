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
        required: true,
    },
    profileViews: {
        type: Number,
        default: 0,
    }
});

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;