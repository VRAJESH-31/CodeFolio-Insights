import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from "../models/user.model.js";
import { JWT_SECRET } from '../config/config.js';

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await UserModel.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        user = new UserModel({
            name,
            email,
            password,
            lastRefresh: Date.now(),
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await UserModel.findOne({ email });
        
        if (!user) return res.status(400).json({ message: 'Invalid Credentials' });
        if (!user.password) return res.status(400).json({ message: 'Authentication for this email is done by non password authentication system' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        profilePicture: user.profilePicture,
                        jobTitle: user.jobTitle
                    }
                });
                res.status(200).json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        console.log(err.stack);
        res.status(500).send('Server error');
    }
};

const getCurrentUser = (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
};

const logout = (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Error destroying session' });
            }
            res.clearCookie('connect.sid');
            res.status(200).json({ message: 'Logged out successfully' });
            if (err) return res.status(500).json({ message: 'Error destroying session' });
            res.clearCookie('connect.sid'); // Clears the session cookie
            return res.status(200).json({ message: 'Logged out successfully' });
        });
    });
};

const checkAuth = async (req, res) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) return res.status(401).json({ message: "Unauthenticated User! Token not provided" });

        const decodedToken = jwt.verify(token, JWT_SECRET);
        const user = await UserModel.findById(decodedToken.user.id).select("-password");

        if (!user) return res.status(401).json({ message: "Invalid token" });
        return res.status(200).json({ user: user, message: "Token validated!" });
    } catch (error) {
        console.log("Error in checkAuth function:", error.message);
        console.log(error.stack);
        return res.status(404).json({ message: "Something went wrong!" });
    }
};

export {
    signup,
    login,
    logout,
    checkAuth,
    getCurrentUser
};
