import express from "express";
import passport from "passport";
import { signup, login, logout, checkAuth } from "../controllers/auth.controller.js";
import { signupValidationSchema, loginValidationSchema } from "../validators/auth.validate.js";
import { getAnalytics } from "../middlewares/analytics.middleware.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { CORS_ORIGIN } from "../config/config.js"
import { generateToken } from "../utils/tokenGenerator.js"
import { validate } from "../middlewares/validate.middleware.js";
import { rateLimit } from 'express-rate-limit';

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per window
  message: { message: "Too many login attempts, please try again after 15 minutes" },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/signup', validate(signupValidationSchema), getAnalytics, signup);
router.post('/login', loginLimiter, validate(loginValidationSchema), getAnalytics, login);
router.get("/check", checkAuth);
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