import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.PORT ? "production" : "development";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const MONGO_CONN = process.env.MONGO_CONN;
const JWT_SECRET = process.env.JWT_SECRET;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const SCRAPE_SPIDEY_API_KEY = process.env.SCRAPE_SPIDEY_API_KEY;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const SESSION_SECRET = process.env.SESSION_SECRET;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export {
    PORT,
    ENV,
    GITHUB_TOKEN,
    MONGO_CONN,
    JWT_SECRET,
    GEMINI_API_KEY,
    SCRAPE_SPIDEY_API_KEY,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    SESSION_SECRET,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME,
    ADMIN_EMAIL,
    ADMIN_PASSWORD
}