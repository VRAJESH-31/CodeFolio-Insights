import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.PORT ? "production" : "development";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const MONGO_CONN = process.env.MONGO_CONN;
const JWT_SECRET = process.env.JWT_SECRET;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const SCRAPE_SPIDEY_API_KEY = process.env.SCRAPE_SPIDEY_API_KEY;

export {
    GITHUB_TOKEN,
    MONGO_CONN,
    JWT_SECRET,
    PORT,
    ENV,
    GEMINI_API_KEY,
    SCRAPE_SPIDEY_API_KEY,
}