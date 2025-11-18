import axiosInstance from "../api/axiosInstance.js"
import {useMutation, useQuery} from "@tanstack/react-query"

const throwAxiosError = (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown API error occurred.';
    throw new Error(errorMessage);
};

// LeetCode function
const getLeetcodeAnalysis = async (username) => {
    try {
        const response = await axiosInstance.get(`/analyze/leetcode?username=${username}`);
        return response.data;
    } catch (error){ // Corrected: (error) is defined
        throwAxiosError(error);
    }
}

// GitHub function
const getGithubAnalysis = async (username) => {
    try {
        const response = await axiosInstance.get(`/analyze/github?username=${username}`);
        return response.data;
    } catch (error){ // Corrected: (error) is defined
        throwAxiosError(error);
    }
}

// LeetCode hook
export const useLeetcodeAnalysis = (username) => {
    return useQuery({
        queryKey: ["leetcodeData", username],
        queryFn: () => getLeetcodeAnalysis(username),
        enabled: false, // prevents auto-fetch until Analyze is clicked
        retry: false,
    });
}

// GitHub hook
export const useGithubAnalysis = (username) => {
    return useQuery({
        queryKey: ["githubData", username],
        queryFn: () => getGithubAnalysis(username),
        enabled: false, // Prevents auto-fetch until Analyze is clicked
        retry: false,
    });
}