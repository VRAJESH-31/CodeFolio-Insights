import z from "zod";
import { VALID_EXPERIENCE_YEARS_RANGE, MAX_PDF_SIZE } from "../constant/constants.js";

const resumeAnalyzerValidationSchema = z.object({
    body: z.object({
        experienceInYears: z.enum(VALID_EXPERIENCE_YEARS_RANGE, { message: "Experience in years must be one of the following: " + VALID_EXPERIENCE_YEARS_RANGE.join(", ") }),
        jobDescription: z.string().optional(),
    }),
    file: z.any()
        .refine((file) => !!file, { message: "Resume pdf not provided!" })
        .refine((file) => file?.mimetype === "application/pdf", { message: "Resume should be in only pdf format!" })
        .refine((file) => file?.size <= MAX_PDF_SIZE, { message: `Size of resume should not surpass ${MAX_PDF_SIZE / (1024 * 1024)} MB!` }),
});

const githubAnalyzerValidationSchema = z.object({
    query: z.object({
        username: z.string({ message: "Username is required!" }).min(1, "Username cannot be empty")
    })
});

const leetcodeAnalyzerValidationSchema = z.object({
    query: z.object({
        username: z.string({ message: "Username is required!" }).min(1, "Username cannot be empty")
    })
});

export {
    resumeAnalyzerValidationSchema,
    githubAnalyzerValidationSchema,
    leetcodeAnalyzerValidationSchema
}