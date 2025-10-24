export const checkAdmin = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user.isAdmin) req.isAdmin = false;
        else req.isAdmin = true;
        next();
    } catch (error) {
        console.log("Error in admin middleware:", error.message);
        console.log(error.stack);
        return res.status(500).json({message: "Internal Sever Error!"})
    }
}