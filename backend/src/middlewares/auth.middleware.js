import { check, validationResult } from 'express-validator';
import { JWT_SECRET } from '../utils/config.js';
import UserModel from '../models/user.model.js';
import jwt from "jsonwebtoken";

export const signupValidation = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
];

export const loginValidation = [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
];

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
};

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) return res.status(401).json({message : "Unauthenticated User! Token not provided"});

        const decodedToken = jwt.verify(token, JWT_SECRET);

        const user = await UserModel.findById(decodedToken.user.id).select("-password");
        if (!user) return res.status(404).json({message : "User not found"});

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in auth middleware:", error.message);
        console.log(error.stack);
        return res.status(500).json({message: "Internal Sever Error!"})
    }
}