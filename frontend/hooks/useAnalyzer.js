import axiosInstance from "../api/axiosInstance.js"
import {useMutation, useQuery} from "@tanstack/react-query"

const throwAxiosError = (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown API error occurred.';
    throw new Error(errorMessage);
};

const getLeetcodeAnalysis = async (username) => {
    try {
        const response = await axiosInstance.get(`/analyze/leetcode?username=${username}`);
        return response.data;
    } catch (error){
        throwAxiosError(error);
    }
}

export const useLeetcodeAnalysis = (username) => {
    return useQuery({
        queryKey: ["leetcodeData", username],
        queryFn: () => getLeetcodeAnalysis(username),
        enabled: false, // prevents auto-fetch until Analyze is clicked
        retry: false,
    });
}