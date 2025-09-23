import axios from "axios";
import { GITHUB_TOKEN } from "./config.js";

// Github Instance
const githubAPI = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json"
    }
})

// ScrapeSpidey Instance
const scrapeSpideyAPI = axios.create({
    baseURL: "https://scrape-spidey.onrender.com",
    headers: {
        Accept: 'application/json',
    }
})

export {
    githubAPI,
    scrapeSpideyAPI,
}