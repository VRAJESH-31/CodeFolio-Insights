import z from "zod";

const bodyScoreValidationSchema = z.object({
    body: z.object({
        score: z.number({ message: "score is required and must be a number" }),
        platform: z.string({ message: "platform is required" })
    })
});

const queryScoreValidationSchema = z.object({
    query: z.object({
        score: z.coerce.number({ message: "Score must be a valid number" }),
        platform: z.string({ message: "platform is required" })
    })
});

const userScoreHistoryValidationSchema = z.object({
    query: z.object({
        platform: z.string({ message: "platform is required" }),
        last: z.string().optional().transform(v => parseInt(v) || 10),
        username: z.string().optional()
    })
});

export {
    bodyScoreValidationSchema,
    queryScoreValidationSchema,
    userScoreHistoryValidationSchema
}
