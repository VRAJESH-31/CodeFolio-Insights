import z from "zod";

const analyticsValidationSchemas = z.object({
    query: z.object({
        startTime: z.string().optional().transform(v => {
            if (!v) return new Date(Date.now() - 24 * 60 * 60 * 1000);
            const num = Number(v);
            return isNaN(num) ? new Date(v) : new Date(num);
        }),
        endTime: z.string().optional().transform(v => {
            if (!v) return new Date();
            const num = Number(v);
            return isNaN(num) ? new Date(v) : new Date(num);
        }),
    })
});

export {
    analyticsValidationSchemas,
}
