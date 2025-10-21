import axios from "axios";
import { GITHUB_TOKEN, SCRAPE_SPIDEY_API_KEY } from "./config.js";

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

// LeetCode Instance function
const leetCodeAPI = axios.create({
    baseURL: "https://leetcode.com/graphql",
    headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com",
        "User-Agent": "Mozilla/5.0",
    }
})



// LeetCode helper function
const leetCodeQuery = async (query, variables = {}) => {
    try{
        const response = await leetCodeAPI.post("", {
            query,
            variables
        });

        return response.data;
    } catch (error){
        console.log("Error occurred: ", error.message);
        console.log(error.stack);
        return null;
    }
}

// GitHub Helper function for GraphQL queries
const githubGraphQlQuery = async (query, variables={}) => {
    try{
        const response = await githubAPI.post("/graphql", {
            query,
            variables
        });

        return response.data;
    } catch (error){
        console.log("Error occurred: ", error.message);
        console.log(error.stack);
        return null;
    }
}

// Github Helper function for RestAPI queries
const githubRestApiQuery = async (endpoint) => {
    try {
        const response = await githubAPI.get(endpoint);
        return response.data;
    } catch (error){
        console.log("Error occurred: ", error.message);
        console.log(error.stack);
        return null;
    }
}

// ScrapeSpidey Helper function
const scrapeSpideyApiQuery = async (endpoint) => {
    try {
        const response = await scrapeSpideyAPI.get(endpoint);
        return response.data;
    } catch (error){
        console.log("Error occurred: ", error.message);
        console.log(error.stack);
        return null;
    }
}


export {
    githubAPI,
    scrapeSpideyAPI,
    leetCodeAPI,
    leetCodeQuery,
    githubGraphQlQuery,
    githubRestApiQuery,
    scrapeSpideyApiQuery,
}