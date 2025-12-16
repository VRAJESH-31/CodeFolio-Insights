import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import passport from './config/passport.js';
import AuthRouter from './routes/auth.route.js';
import AnalyzeRouter from './routes/analyze.route.js';
import ProfilesRouter from './routes/profiles.route.js';
import UserRouter from './routes/user.route.js';
import ScoreRouter from './routes/score.route.js';
import AnalyticsRouter from './routes/analytics.route.js';
import { connectToDB } from './db.js';
import { PORT, SESSION_SECRET, CORS_ORIGIN } from './config/config.js';
import cookieParser from "cookie-parser";
import { createAdmin } from './utils/seed/adminSeed.js';

const app = express();

app.set('trust proxy', 1);

// Middleware
app.use(bodyParser.json());
app.use(express.json({ limit: '16mb' }));
app.use(express.urlencoded({ extended: true, limit: '16mb' }));
app.use(express.static('public'));
app.use(cookieParser());

// CORS configuration (with credentials for frontend)
app.use(
    cors({
        origin: CORS_ORIGIN, // Your frontend URL
        credentials: true,
    })
);

// Express session middleware
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', AuthRouter);
app.use('/analyze', AnalyzeRouter);
app.use('/profiles', ProfilesRouter);
app.use('/user', UserRouter);
app.use('/analytics', AnalyticsRouter);
app.use('/score', ScoreRouter);

// Start server after DB connection & admin seeding
const startServer = async () => {
    await createAdmin();
    app.listen(PORT, () => {
        console.log(`✅ Server running on PORT ${PORT}`);
    });
};

connectToDB()
    .then(async () => {
        await startServer();
    })
    .catch((error) => {
        console.error('❌ MongoDB Database failed to connect:', error);
    });
