import z from "zod";
import { PLATFORMS } from "../constant/index.js";

const profileUpdateValidationSchema = z.object({
    query: z.object({
        platformName: z.enum(Object.keys(PLATFORMS), { message: "Invalid platform name!" }),
        platformUsername: z.string({ message: "Platform username is required!" }).min(1, "Platform username cannot be empty")
    })
});

const profilesUpdateValidationSchema = z.object({
    body: z.record(z.string()).refine((data) => Object.keys(data).length > 0, { message: "No data provided for update" })
});

export {
    profileUpdateValidationSchema,
    profilesUpdateValidationSchema,
}