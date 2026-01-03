import asyncHandler from '../utils/asyncHandler.js';

export const checkAdmin = asyncHandler(async (req, res, next) => {
    const user = req.user;
    if (!user || !user.isAdmin) return res.status(403).json({ message: "You are not authorized to access this service." });
    next();
});