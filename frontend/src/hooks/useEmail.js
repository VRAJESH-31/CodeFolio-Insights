import { axiosInstance, asyncWrapper } from "@/api/export.js";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useContactUs = () => {
    return useMutation({
        mutationFn: asyncWrapper(async (contactData) => {
            const response = await axiosInstance.post("/api/email/contact-us", contactData);
            return response.data;
        }),
        onSuccess: () => {
            toast.success("Message sent successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to send message");
        },
    });
};
