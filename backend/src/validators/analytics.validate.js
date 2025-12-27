import z from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const getAnalyticsValidationSchema = z.object({
    query: z.object({
        interval: z.string().optional().transform(v => parseInt(v) || 24 * 60 * 60 * 1000)
    })
});

const getPerUserAnalyticsValidationSchema = z.object({
    params: z.object({
        userId: z.string({ message: "User id is required!" }).regex(objectIdRegex, "Invalid user ID format.")
    }),
    query: z.object({
        interval: z.string().optional().transform(v => parseInt(v) || 24 * 60 * 60 * 1000)
    })
});

const getUnAuthenticatedUserAnalyticsValidationSchema = z.object({
    query: z.object({
        interval: z.string().optional().transform(v => parseInt(v) || 24 * 60 * 60 * 1000)
    })
});

export {
    getAnalyticsValidationSchema,
    getPerUserAnalyticsValidationSchema,
    getUnAuthenticatedUserAnalyticsValidationSchema
}
