import { axiosInstance, asyncWrapper } from "../api/export.js";
import { useMutation, useQuery } from "@tanstack/react-query"

export const useSaveScore = () => {
    return useMutation({
        mutationFn: asyncWrapper(async (scoreData) => {
            const response = await axiosInstance.post("/score", scoreData, { requiresAuth: true });
            return response.data;
        }),
    });
}

export const usePlatformScoreStats = (score, platform) => {
    return useQuery({
        queryKey: ["platformScoreStats", score, platform],
        queryFn: asyncWrapper(async () => {
            const response = await axiosInstance.get(`/score/platform-score-stats?score=${score}&platform=${platform}`);
            return response.data;
        }),
        enabled: !!score && !!platform,
    });
}

export const useScoreHistory = (platform, username, last = 10) => {
    return useQuery({
        queryKey: ["scoreHistory", platform, username, last],
        queryFn: asyncWrapper(async () => {
            const response = await axiosInstance.get(`/score/score-history?platform=${platform}&username=${username}&last=${last}`, { requiresAuth: true });
            return response.data;
        }),
        enabled: !!platform,
    });
}
