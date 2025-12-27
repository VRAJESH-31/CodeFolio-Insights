import z from "zod";
import { platforms } from "../constant/constants.js";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const getProfileValidationSchema = z.object({
    params: z.object({
        userId: z.string({ message: "User id is required!" }).regex(objectIdRegex, "Invalid user ID format.")
    })
});

const updateProfileValidationSchema = z.object({
    query: z.object({
        platformName: z.enum(Object.keys(platforms), { message: "Invalid platform name!" }),
        platformUsername: z.string({ message: "Platform username is required!" }).min(1, "Platform username cannot be empty")
    })
});

const updateProfilesValidationSchema = z.object({
    body: z.record(z.string()).refine((data) => Object.keys(data).length > 0, { message: "No data provided for update" })
});

const refreshProfileValidationSchema = z.object({
    params: z.object({
        userId: z.string({ message: "User id is required!" }).regex(objectIdRegex, "Invalid user ID format.")
    })
});

const getProfileCacheValidationSchema = z.object({
    params: z.object({
        userId: z.string({ message: "User id is required!" }).regex(objectIdRegex, "Invalid user ID format.")
    })
});

export {
    getProfileValidationSchema,
    updateProfileValidationSchema,
    updateProfilesValidationSchema,
    refreshProfileValidationSchema,
    getProfileCacheValidationSchema
}