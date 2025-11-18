import jwt from "jsonwebtoken";
import {JWT_SECRET, ENV} from "../config/config.js";

const generateToken = (userId, res) => {

    const payload = {
        user: {
            id: userId,
        }
    };

    const token = jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn : "15d" },
    );

    res.cookie("token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly : true,
        sameSite : "Lax",
        secure: ENV == "production",
    })

    return token;
}

export {
    generateToken,
}