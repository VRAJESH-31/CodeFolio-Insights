import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import useAuthStore from '../../store/useAuthStore';

const useDashboard = () => {
    const { user } = useAuthStore();

    const { data: profiles, isLoading: isLoadingProfiles } = useQuery({
        queryKey: ['profiles', user?._id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/profiles/${user._id}`);
            return res.data;
        },
        enabled: !!user?._id,
    });

    const { data: githubData, isLoading: isLoadingGithub } = useQuery({
        queryKey: ['github', profiles?.githubUsername],
        queryFn: async () => {
            const res = await axiosInstance.get(`/analyze/github?username=${profiles.githubUsername}`);
            return res.data;
        },
        enabled: !!profiles?.githubUsername,
    });

    const { data: leetcodeData, isLoading: isLoadingLeetcode } = useQuery({
        queryKey: ['leetcode', profiles?.leetCodeUsername],
        queryFn: async () => {
            const res = await axiosInstance.get(`/analyze/leetcode?username=${profiles.leetCodeUsername}`);
            return res.data;
        },
        enabled: !!profiles?.leetCodeUsername,
    });

    const { data: resumeData, isLoading: isLoadingResume } = useQuery({
        queryKey: ['resumeScore', user?._id],
        queryFn: async () => {
            const res = await axiosInstance.get('/score/score-history?platform=Generic Resume&last=1', { requiresAuth: true });
            return res.data;
        },
        enabled: !!user?._id,
    });

    return {
        profiles,
        githubData,
        leetcodeData,
        resumeData: resumeData?.[0],
        isLoading: isLoadingProfiles || isLoadingGithub || isLoadingLeetcode || isLoadingResume,
    };
};

export default useDashboard;
