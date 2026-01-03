import axios from "axios";
import { GITHUB_TOKEN} from "../config/config.js";

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
    githubGraphQlQuery,
    githubRestApiQuery,
    scrapeSpideyApiQuery,
}