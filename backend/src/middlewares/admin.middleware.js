import ApiError from '../utils/api-error.util.js';
import asyncHandler from '../utils/async-handler.util.js';

const checkAdmin = asyncHandler(async (req, res, next) => {
    const user = req.user;
    if (!user || !user.isAdmin) throw new ApiError(403, "You are not authorized to access this service.");
    next();
});

export {
    checkAdmin,
};