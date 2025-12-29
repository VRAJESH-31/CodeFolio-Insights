import { axiosInstance, asyncWrapper } from "../api/export.js";
import { useMutation, useQuery } from "@tanstack/react-query"

export const useCheckAuth = () => {
    return useQuery({
        queryKey: ["checkAuth"],
        retry: 3,
        queryFn: asyncWrapper(async () => {
            const response = await axiosInstance.get("/auth/check", { requiresAuth: true });
            return response.data;
        })
    })
}

export const useLogin = () => {
    return useMutation({
        mutationFn: asyncWrapper(async (formData) => {
            const response = await axiosInstance.post("/auth/login", formData);
            return response.data;
        }),
        retry: 3,
    })
}

export const useSignUp = () => {
    return useMutation({
        mutationFn: asyncWrapper(async (formData) => {
            const response = await axiosInstance.post("/auth/signup", formData);
            return response.data;
        }),
        retry: 3,
    })
}

export const useUser = (id) => {
    return useQuery({
        queryKey: ["user", id],
        retry: 3,
        queryFn: asyncWrapper(async () => {
            const response = await axiosInstance.get(`/user/${id}`);
            return response.data;
        }),
        enabled: !!id,
    })
}

export const useUpdateUser = () => {
    return useMutation({
        mutationFn: asyncWrapper(async (formData) => {
            const response = await axiosInstance.patch("/user", formData, { requiresAuth: true });
            return response.data;
        }),
    })
}

export const useChangePassword = () => {
    return useMutation({
        mutationFn: asyncWrapper(async (passwordData) => {
            const response = await axiosInstance.patch("/user/password", passwordData, { requiresAuth: true });
            return response.data;
        }),
    })
}

export const useUpdateLastRefresh = () => {
    return useMutation({
        mutationFn: asyncWrapper(async () => {
            const response = await axiosInstance.patch("/user/last-refresh", {}, { requiresAuth: true });
            return response.data;
        }),
    })
}

export const useLogout = () => {
    return useMutation({
        mutationFn: asyncWrapper(async () => {
            const response = await axiosInstance.post("/auth/logout", {}, { requiresAuth: true });
            return response.data;
        }),
    })
}

export const useUsers = (params) => {
    return useQuery({
        queryKey: ["users", params],
        queryFn: asyncWrapper(async () => {
            const response = await axiosInstance.get("/user", { params, requiresAuth: true });
            return response.data;
        }),
        retry: false,
    })
}

export const useAddProfileView = () => {
    return useMutation({
        mutationFn: asyncWrapper(async (userId) => {
            const response = await axiosInstance.patch(`/user/profile-view/${userId}`, {}, { requiresAuth: true });
            return response.data;
        }),
    })
}