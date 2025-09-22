import express from "express";
import passport from "passport";
import { signup, login, logout } from "../controllers/auth.controller.js";
import { signupValidation, loginValidation, validate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/signup', signupValidation, validate, signup);
router.post('/login', loginValidation, validate, login);

router.post('/logout', logout);

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }),
    (req, res) => {
        res.redirect('http://localhost:5173/home');
    });


export default router;