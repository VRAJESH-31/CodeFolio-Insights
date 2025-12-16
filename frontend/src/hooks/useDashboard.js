import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance.js";
import { useCheckAuth } from "./useUsers";

const fetchProfilesData = async (username) => {
    try {
        const response = await axiosInstance.get(`/profiles/fetch/${username}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An unknown API error occurred.';
        throw new Error(errorMessage);
    }
};

const useDashboard = () => {
    const { data: authData, isLoading: isAuthLoading } = useCheckAuth();
    const username = authData?.user?.name;

    const { data: dashboardData, isLoading: isDashboardLoading, error } = useQuery({
        queryKey: ["profilesData", username],
        queryFn: () => fetchProfilesData(username),
        enabled: !!username,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    return {
        dashboardData,
        isLoading: isAuthLoading || isDashboardLoading,
        error,
    };
};

export default useDashboard;