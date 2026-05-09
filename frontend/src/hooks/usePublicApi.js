import { asyncWrapper } from "@/api/export.js";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const usePublicApiPlayground = () => {
    return useMutation({
        mutationFn: asyncWrapper(async (url) => {
            const response = await axios.get(url);
            return response.data;
        }),
        onError: (error) => {
            const errorData = error?.response?.data;
            toast.error(errorData?.message || "Something went wrong while fetching data");
        }
    });
};
