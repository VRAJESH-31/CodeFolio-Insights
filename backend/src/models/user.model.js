import mongoose from "mongoose";
import { getCountries, getCountryCallingCode } from 'libphonenumber-js';

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    jobTitle: {
        String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    profile: {
        type: String,
    },
    headline: {
        type: String,
        trim: true,
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
    },
    location: {
        type: String,
    },
    countryCode: {
        type: String,
        enum: getCountries().map((code) => getCountryCallingCode(code)),
    },
    phone: {
        type: Number,
        length: 10,
    },
    linkedinUsername: {
        type: String,
        default: "",
    },
    twitterUsername: {
        type: String,
        default: "",
    },
    portfolioWebsiteLink: {
        type: String,
        default: "",
    },
    resumeLink: {
        type: String,
        default: "",
    },
}, { timestamps: true });

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;