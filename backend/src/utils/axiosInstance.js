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

export {
    githubAPI,
}