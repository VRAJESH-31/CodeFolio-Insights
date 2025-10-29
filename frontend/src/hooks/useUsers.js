import axiosInstance from "../api/axiosInstance.js"
import {useMutation, useQuery} from "@tanstack/react-query"

const throwAxiosError = (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown API error occurred.';
    throw new Error(errorMessage);
};

const checkAuth = async () => {
    try {
        const response = await axiosInstance.get("/auth/check");
        return response.data;
    } catch (error){
        throwAxiosError(error);
    }
}

const login = async () => {
    try {
        const response = await axiosInstance.post("/auth/login");
        return response.data;
    } catch (error) {
        throwAxiosError(error);
    }
}

const signUp = async () => {
    try {
        const response = await axiosInstance.post("/auth/signup");
        return response.data;
    } catch (error){
        throwAxiosError(error);
    }
}

const getUserInfo = async () => {
    try {
        const response = await axiosInstance.get("/auth/user");
        return response.data;
    } catch (error){
        throwAxiosError(error);
    }
}



// Custom Hooks
export const useCheckAuth = () => {
    return useQuery({
        queryKey: ["checkAuth"],
        retry: 3,
        queryFn: checkAuth,
    })
}

export const useLogin = () => {
    return useMutation({
        mutationFn: login,
        retry: 3,
    })
}

export const useSignUp = () => {
    return useMutation({
        mutationFn: signUp,
        retry: 3,
    })
}

export const useUserInfo = () => {
    return useQuery({
        queryKey: ["userInfo"],
        retry: 3,
        queryFn: getUserInfo,
    })
}