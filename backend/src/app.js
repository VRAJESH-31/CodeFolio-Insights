import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from './config/passport.config.js';
import AuthRouter from './routes/auth.route.js';
import AnalyzeRouter from './routes/analyze.route.js';
import ProfileRouter from './routes/profile.route.js';
import UserRouter from './routes/user.route.js';
import ScoreRouter from './routes/score.route.js';
import PlatformRouter from './routes/platform.route.js';
import AnalyticsRouter from './routes/analytics.route.js';
import ApiProjectRouter from './routes/api-project.route.js';
import EmailRouter from './routes/email.route.js';
import { SESSION_SECRET, CORS_ORIGIN } from './config/env.config.js';
import cookieParser from "cookie-parser";
import { publicApiRateLimiter } from './middlewares/rate-limiter.middleware.js';
import { getAnalytics } from './middlewares/analytics.middleware.js';

const app = express();

app.set('trust proxy', 1);

// Middleware
app.use(bodyParser.json());
app.use(express.json({ limit: '16mb' }));
app.use(express.urlencoded({ extended: true, limit: '16mb' }));
app.use(express.static('public'));
app.use(cookieParser(SESSION_SECRET));

// CORS configuration (with credentials for frontend) for private routes
const privateRoutesConfiguration = {
    origin: CORS_ORIGIN,
    credentials: true,
}

const publicRoutesConfiguration = {
    origin: "*",
}

app.use(
    cors(privateRoutesConfiguration)
);

// Passport middleware
app.use(passport.initialize());

// Health Check
app.get('/health', (req, res) => {
    return res.status(200).json({
        status: "UP",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || "development",
        message: "Service is healthy"
    });
});

// Routes
app.use('/api/auth', AuthRouter);
app.use('/api/analyze', AnalyzeRouter);
app.use('/api/profile', ProfileRouter);
app.use('/api/user', UserRouter);
app.use('/api/score', ScoreRouter);
app.use('/api/analytics', AnalyticsRouter);
app.use('/api/project', ApiProjectRouter);
app.use('/api/email', EmailRouter);
app.use('/api/platform', cors(publicRoutesConfiguration), publicApiRateLimiter, getAnalytics, PlatformRouter);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Handle JWT specific errors if they bubble up
    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired, please login again';
    } else if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token, unauthenticated';
    }

    return res.status(statusCode).json({ message });
});

export { app };
