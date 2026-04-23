import jwt from 'jsonwebtoken';
import UserModel from "../models/user.model.js";
import { JWT_SECRET } from '../config/env.config.js';
import { generateAuthToken, generateVerificationToken, deleteAuthToken, deleteVerificationToken } from '../utils/token.util.js';
import asyncHandler from '../utils/async-handler.util.js';
import * as AuthService from '../services/auth.service.js';

const signup = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const { verificationId } = await AuthService.signup(name, email, password);
    const verificationToken = generateVerificationToken(verificationId, res);

    return res.status(200).json({
        message: 'Verification code sent to your email',
        requires2FA: true,
        verificationToken
    });
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const { user, verificationId, requires2FA } = await AuthService.login(email, password);

    // If 2FA is disabled, login directly
    if (!requires2FA) {
        const userObject = user.toObject();
        delete userObject.password;
        if (userObject.googleId) delete userObject.googleId;

        const token = generateAuthToken(user._id, res);
        return res.status(200).json({ token, user: userObject });
    }

    // 2FA is enabled
    const verificationToken = generateVerificationToken(verificationId, res);

    return res.status(200).json({
        message: '2FA code sent to your email',
        requires2FA: true,
        verificationToken
    });
});

const verifyOTP = asyncHandler(async (req, res) => {
    const { otp } = req.body;
    const verificationToken = req.cookies.verificationToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!verificationToken) return res.status(401).json({ message: 'Verification session expired' });

    let decoded;
    try {
        decoded = jwt.verify(verificationToken, JWT_SECRET);
    } catch {
        return res.status(401).json({ message: 'Invalid or expired verification token' });
    }

    const user = await AuthService.verifyOTP(otp, decoded.verification.id);

    deleteVerificationToken(res); // Clear verificationToken from cookies

    const userObject = user.toObject();
    delete userObject.password;
    if (userObject.googleId) delete userObject.googleId;

    const token = generateAuthToken(user._id, res);
    return res.status(200).json({
        message: 'Authenticated successfully!',
        token,
        user: userObject
    });
});

const logout = asyncHandler(async (req, res) => {
    deleteAuthToken(res);
    return res.status(200).json({ message: 'Logged out successfully' });
});

const checkAuth = asyncHandler(async (req, res) => {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "") || null;
    if (!token) return res.status(401).json({ message: "Unauthenticated User! Token not provided" });

    const decodedToken = jwt.verify(token, JWT_SECRET);
    const user = await UserModel.findById(decodedToken.user.id).select("-password -googleId");

    if (!user) return res.status(401).json({ message: "Invalid token" });
    return res.status(200).json({ user: user, token: token, message: "Token validated!" });
});

export {
    signup,
    login,
    verifyOTP,
    logout,
    checkAuth
};
