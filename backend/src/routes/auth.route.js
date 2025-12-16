import express from "express";
import passport from "passport";
import { signup, login, logout, checkAuth } from "../controllers/auth.controller.js";
import { signupValidation, loginValidation, validate } from "../middlewares/auth.middleware.js";
import { getAnalytics } from "../middlewares/analytics.middleware.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {CORS_ORIGIN} from "../config/config.js"
import {generateToken} from "../utils/tokenGenerator.js"

const router = express.Router();

router.post('/signup', signupValidation, validate, getAnalytics, signup);
router.post('/login', loginValidation, validate, getAnalytics, login);
router.get("/check", checkAuth);
// router.get('/user', getCurrentUser);
router.post('/logout', protectRoute, getAnalytics, logout);

router.get('/google', 
    getAnalytics,
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  getAnalytics,
  (req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.redirect(`${CORS_ORIGIN}/login`);
      generateToken(user.id, res);
      return res.redirect(`${CORS_ORIGIN}/dashboard`);
    })(req, res, next);
  }
);

export default router;