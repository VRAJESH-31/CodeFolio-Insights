// frontend/src/api/axiosInstance.js
import axios from "axios";
import conf from "../config/config.js"

const axiosInstance = axios.create({
    baseURL : conf.SERVER_BASE_URL,
    headers : {
        "Content-Type" : "application/json",
    }
})

axiosInstance.interceptors.request.use(
    (config) => {
        if (config.requiresAuth){
            const loggedInUser = localStorage.getItem("loggedInUser");
            if (loggedInUser) {
                try {
                    const parsedUser = JSON.parse(loggedInUser);
                    const token = parsedUser?.state?.token;
                    console.log(token);
                    if (token) config.headers.Authorization = `Bearer ${token}`;
                } catch (error) {
                    console.error("Error parsing user data from local storage", error);
                }
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosInstance;