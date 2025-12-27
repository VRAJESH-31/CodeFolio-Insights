import handleError from '../utils/handleError.js';

export const checkAdmin = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user || !user.isAdmin) return res.status(403).json({ message: "You are not authorized to access this service." });
        next();
    } catch (error) {
        return handleError(res, error, "Internal Server Error!");
    }
}