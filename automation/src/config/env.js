import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, '../../.env')
});

const CONF = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    GEMINI_API_MODEL: process.env.GEMINI_API_MODEL,
};

export default CONF;