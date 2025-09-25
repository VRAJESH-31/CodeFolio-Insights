import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import passport from "./config/passport.js";
import AuthRouter from "./routes/auth.route.js";
import AnalyzeRouter from "./routes/analyze.route.js";
import { connectToDB } from "./utils/db.js";
import { PORT, SESSION_SECRET } from "./utils/config.js";

const app = express();

app.use(bodyParser.json());
app.use(
    cors({
        origin: "http://localhost:5173", // your frontend URL
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

app.use("/auth", AuthRouter);
app.use("/analyze", AnalyzeRouter);

connectToDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening to app on PORT no ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB Database Failed to connect! ", error);
    });
