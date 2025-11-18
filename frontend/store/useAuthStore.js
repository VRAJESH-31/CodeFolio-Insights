import {create} from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../src/api/axiosInstance.js";
import conf from "../src/config/config.js";

const useAuthStore = create(
    persist(
        (set) => ({
            user : null,
            token : null,

            login : async (formData, navigate) => {
                try {
                    const response = await axiosInstance.post(`${conf.SERVER_BASE_URL}/auth/login`, JSON.stringify(formData));
                    const data = response.data;
                    set ({user: data.user, token: data.token});
                    navigate("/home");
                } catch (err) {
                    console.error('Server error:', err);
                }
            },

            signup : async (formData, navigate) => {
                try {
                    const response = await axiosInstance.post(`${conf.SERVER_BASE_URL}/auth/signup`, JSON.stringify(formData));
                    const data = response.data;
                    set ({user: data.user, token: data.token});
                    navigate("/home");
                } catch (err) {
                    console.error('Server error:', err);
                }
            },

            logout : async () => {
                try {
                    const response = await axiosInstance.post(`${conf.SERVER_BASE_URL}/auth/logout`, {}, {requiresAuth : true});
                    const data = response.data;
                    localStorage.removeItem("loggedInUser");
                    set({user:null, token: null});
                } catch (err){
                    console.error('Server error:', err);
                    console.log(err.response.data.message);
                }
            },

            checkAuth : async () => {
                try {
                    const response = await axiosInstance.get(`${conf.SERVER_BASE_URL}/auth/check`, {requiresAuth : true});
                    const data = response.data;
                    set({user:data.user, token: data.token});
                } catch (err) {
                    console.error('Server error:', err);
                }
            }
        }),
        {
            name : "loggedInUser"
        }
    )
);

export default useAuthStore;