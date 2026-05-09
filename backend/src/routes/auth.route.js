import express from "express";
import passport from "passport";
import { signup, login, verifyOTP, logout, checkAuth } from "../controllers/auth.controller.js";
import { signupValidationSchema, loginValidationSchema, otpValidationSchema } from "../validators/auth.validate.js";
import { getAnalytics } from "../middlewares/analytics.middleware.js";
import { CORS_ORIGIN } from "../config/env.config.js"
import { generateAuthToken } from "../utils/token.util.js"
import { validate } from "../middlewares/validate.middleware.js";
import { loginRateLimiter } from "../middlewares/rate-limiter.middleware.js";

const router = express.Router();

router.post(
  '/signup',
  getAnalytics,
  validate(signupValidationSchema),
  signup
);

router.post(
  '/login',
  getAnalytics,
  loginRateLimiter,
  validate(loginValidationSchema),
  login
);

router.post(
  '/verify-otp',
  getAnalytics,
  validate(otpValidationSchema),
  verifyOTP
);

router.get(
  "/check",
  checkAuth
);

router.post(
  '/logout',
  getAnalytics,
  logout
);

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
      generateAuthToken(user.id, res);
      return res.redirect(`${CORS_ORIGIN}/dashboard/${user.displayName}`);
    })(req, res, next);
  }
);

export default router;
