import axiosInstance from "../api/axiosInstance.js"
import { useMutation, useQuery } from "@tanstack/react-query"

const throwAxiosError = (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown API error occurred.';
    throw new Error(errorMessage);
};

// Fetch from Redis Cache
const getProfileCache = async (userId) => {
    try {
        const response = await axiosInstance.get(`/profiles/cache/${userId}`);
        return response.data;
    } catch (error) {
        // Fail silently/gracefully for cache? Or throw?
        // Throwing is fine, React Query handles it.
        throwAxiosError(error);
    }
}

// Fetch Fresh Data + Update Redis
const refreshProfileData = async (userId) => {
    try {
        const response = await axiosInstance.get(`/profiles/fetch/${userId}`);
        return response.data;
    } catch (error) {
        throwAxiosError(error);
    }
}


// Hook for Cache
export const useProfileCache = (userId) => {
    return useQuery({
        queryKey: ["profileCache", userId],
        queryFn: () => getProfileCache(userId),
        enabled: !!userId, // Only run if userId exists
        retry: false,
        staleTime: 0, // Always consider stale? Or maybe infinite since we handle refresh manually?
        // Actually, if we want to re-check cache logic often, keep it default or short.
    });
}

// Hook for Refresh
// We use useQuery with enabled: false to trigger manually via refetch
export const useProfileRefresh = (userId) => {
    return useQuery({
        queryKey: ["profileRefresh", userId],
        queryFn: () => refreshProfileData(userId),
        enabled: false, // Don't run automatically
        retry: false,
    });
}
