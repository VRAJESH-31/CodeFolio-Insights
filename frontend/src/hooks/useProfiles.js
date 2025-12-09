import axiosInstance from "../api/axiosInstance.js"
import {useMutation, useQuery} from "@tanstack/react-query"

const throwAxiosError = (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown API error occurred.';
    throw new Error(errorMessage);
};

const getCodingProfilesData = async (username) => {
    try {
        const response = await axiosInstance.get(`/profiles/fetch/${username}`);
        return response.data;
    } catch (error){
        throwAxiosError(error);
    }
}

// Coding Profiles Data hook
export const useCodingProfilesData = (username) => {
    return useQuery({
        queryKey: ["profilesData", username],
        queryFn: () => getCodingProfilesData(username),
        enabled: false,
        retry: false,
    });
}