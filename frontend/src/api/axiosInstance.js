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
            const token = JSON.parse(loggedInUser).state.token;
            if (token) config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosInstance;