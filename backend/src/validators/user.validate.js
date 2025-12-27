import z from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const getUserValidationSchema = z.object({
    params: z.object({
        id: z.string({ message: "User id is required!" }).regex(objectIdRegex, "Invalid user ID format.")
    })
});

const getUsersValidationSchema = z.object({
    query: z.object({
        limit: z.string().optional().transform(v => parseInt(v) || 10),
        searchQuery: z.string().optional(),
        searchField: z.string().optional(),
        searchOrder: z.string().optional().transform(v => parseInt(v) || 0),
        cursor: z.string().optional()
    })
});

const updateUserInfoValidationSchema = z.object({
    body: z.object({
        name: z.string().min(3, "Name must be at least 3 characters long").optional(),
    }).passthrough()
});

const changePasswordValidationSchema = z.object({
    body: z.object({
        oldPassword: z.string().min(6, "Old password must be at least 6 characters long"),
        newPassword: z.string().min(6, "New password must be at least 6 characters long"),
    })
});

const addProfileViewValidationSchema = z.object({
    params: z.object({
        userId: z.string({ message: "User id is required!" }).regex(objectIdRegex, "Invalid user ID format.")
    })
});

export {
    getUserValidationSchema,
    getUsersValidationSchema,
    updateUserInfoValidationSchema,
    changePasswordValidationSchema,
    addProfileViewValidationSchema
}
