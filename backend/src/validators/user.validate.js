import z from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const usersQueryValidationSchema = z.object({
    query: z.object({
        limit: z.string().optional().transform(v => parseInt(v) || 10),
        searchQuery: z.string().optional(),
        searchField: z.string().optional(),
        searchOrder: z.string().optional().transform(v => parseInt(v) || 0),
        cursor: z.string().optional()
    })
});

const userInfoUpdateValidationSchema = z.object({
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

const userIdValidationSchema = z.object({
    params: z.object({
        userId: z.string({ message: "User id is required!" }).regex(objectIdRegex, "Invalid user ID format.")
    })
});

const usernameValidationSchema = z.object({
    query: z.object({
        username: z.string({ message: "Username is required!" }).min(1, "Username cannot be empty")
    })
});

export {
    usersQueryValidationSchema,
    userInfoUpdateValidationSchema,
    changePasswordValidationSchema,
    userIdValidationSchema,
    usernameValidationSchema
}
