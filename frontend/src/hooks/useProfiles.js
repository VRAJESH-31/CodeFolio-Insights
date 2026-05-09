import { axiosInstance, asyncWrapper } from "@/api/export.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

// Hook for Cache
export const useProfileCache = (displayName) => {
    return useQuery({
        queryKey: ["profileCache", displayName],
        queryFn: asyncWrapper(async () => {
            const response = await axiosInstance.get(`/api/profile/cache/${displayName}`);
            return response.data;
        }),
        enabled: !!displayName,
        retry: false,
        staleTime: 0,
    });
}

// Hook for Refresh
export const useProfileRefresh = (displayName) => {
    return useQuery({
        queryKey: ["profileRefresh", displayName],
        queryFn: asyncWrapper(async () => {
            const response = await axiosInstance.get(`/api/profile/fetch/${displayName}`);
            return response.data;
        }),
        enabled: false,
        retry: false,
    });
}

// Hook for general profile data
export const useProfileLinks = (displayName) => {
    return useQuery({
        queryKey: ["profileLinks", displayName],
        queryFn: asyncWrapper(async () => {
            const response = await axiosInstance.get(`/api/profile/${displayName}`);
            return response.data;
        }),
        enabled: !!displayName,
        retry: false,
    });
};


export const useUpdateProfileLink = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: asyncWrapper(async ({ platformName, platformUsername }) => {
            const response = await axiosInstance.patch('/api/profile/platform', {}, {
                params: { platformName, platformUsername }
            });
            return response.data;
        }),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['profileLinks']);
            const platform = variables.platformName;
            toast.success(`${platform.charAt(0).toUpperCase() + platform.slice(1)} link updated successfully!`);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Couldn't update the link");
        }
    });
};