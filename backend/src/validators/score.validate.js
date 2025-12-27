import z from "zod";

const saveScoreValidationSchema = z.object({
    body: z.object({
        score: z.number({ message: "score is required and must be a number" }),
        platform: z.string({ message: "platform is required" })
    })
});

const getPlatformScoreStatsValidationSchema = z.object({
    query: z.object({
        score: z.string().transform(v => parseFloat(v)),
        platform: z.string({ message: "platform is required" })
    })
});

const getUserScoreHistoryValidationSchema = z.object({
    query: z.object({
        platform: z.string({ message: "platform is required" }),
        last: z.string().optional().transform(v => parseInt(v) || 10),
        username: z.string().optional()
    })
});

export {
    saveScoreValidationSchema,
    getPlatformScoreStatsValidationSchema,
    getUserScoreHistoryValidationSchema
}
