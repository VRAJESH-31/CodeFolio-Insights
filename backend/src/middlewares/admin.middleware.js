import handleError from '../utils/handleError.js';

export const checkAdmin = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user.isAdmin) req.isAdmin = false;
        else req.isAdmin = true;
        next();
    } catch (error) {
        return handleError(res, error, "Internal Server Error!");
    }
}