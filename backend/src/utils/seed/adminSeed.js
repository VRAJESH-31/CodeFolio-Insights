import UserModel from "../../models/user.model.js"
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../../config/config.js";
import bcrypt from 'bcrypt';

const createAdmin = async () => {
    try {
        const admin = await UserModel.findOne({email: ADMIN_EMAIL});

        if (admin){
            console.log("Admin already exists");
        } else {
            const newAdmin = await UserModel.create({
                name : "Admin",
                email: ADMIN_EMAIL,
                password: await bcrypt.hash(ADMIN_PASSWORD, await bcrypt.genSalt(10)),
                isAdmin: true,
            })

            if (!newAdmin) console.log("Admin not created!");
            else console.log("Admin created!");
        }
    } catch (error){
        console.log("Error occurred:", error.message);
        console.log(error.stack);
    }
}

export {
    createAdmin,
}