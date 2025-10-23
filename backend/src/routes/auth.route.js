import express from "express";
import passport from "passport";
import { signup, login, logout } from "../controllers/auth.controller.js";
import { signupValidation, loginValidation, validate } from "../middlewares/auth.middleware.js";
import { getAnalytics } from "../middlewares/analytics.middleware.js";

const router = express.Router();

router.post('/signup', signupValidation, validate, getAnalytics, signup);
router.post('/login', loginValidation, validate, getAnalytics, login);

router.post('/logout', getAnalytics, logout);

router.get('/google', 
    getAnalytics,
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
    getAnalytics,
    passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }),
    (req, res) => {
        res.redirect('http://localhost:5173/home');
    });


export default router;