import UserModel from "../models/user.model";
import { destroyFile, uploadFile } from "../utils/cloudinary";

const getUser = async () => {
    try {
        const userId = req.params.id;
        if (!userId) return res.status(200).json({message: "User id is required!"});

        const user = await UserModel.findById(userId);
        if (!user) return res.status(404).json({message: "Invalid user id!"});;

        return res.status(200).json(user);
    } catch (error){
        console.log("Failed to fetch user:", error.message);
        console.log(error.stack);
        return res.status(500).json({message: "Something went wrong!"});
    }
}

const updateUserInfo = async () => {
    try {
        const userId = req.params.id;
        const {bio, profileVisibility, name} = req.body;
        const file = req.file;

        if (!userId) return res.status(200).json({message: "User id is required!"});

        const user = await UserModel.findById(userId);
        if (!user) return res.status(404).json({message: "Invalid user id!"});

        const existingUser = await UserModel.findOne({name});
        if (existingUser) return res.status(400).json({message: "User with given name already exists"});

        user.name = name;
        user.bio = bio;
        user.profileVisibility = profileVisibility;
        user.save();

        const previousProfileImageUrl = user.profile;
        const newProfileImageUrl = await uploadFile(file.path, "Codefolio");

        if (newProfileImageUrl){
            if (previousProfileImageUrl) destroyFile(previousProfileImageUrl);
            user.image = newProfileImageUrl;
        } else {
            return res.status(500).json({message: "Couldn't upload new profile image!"});
        }

        return res.status(200).json(user);
    } catch (error){
        console.log("Failed to fetch user:", error.message);
        console.log(error.stack);
        return res.status(500).json({message: "Something went wrong!"});
    }
}

const changePassword = async () => {
    try {
        const user = req.user;
        const {password} = req.body;

        if (user.password){
            if (await bcrypt.compare(password, user.password)){
                return res.status(400).json({message: "Your new password is same as old password!"});
            } else {
                return res.status(200).json({message: "Password Changed"});
            }
        } else {
            return res.status(400).json({message: "You are logged in through third party login services, and not general password login"});
        }
    } catch (error){
        console.log("Error occurred changing password:", error.message);
        console.log(error.stack);
        return res.json().status({message: "Could not change password"});
    }
}

const addProfileView = async () => {
    const user = req.user;
    const {userId} = req.body;

    if (user._id === userId){
        return res.status(403).json({message: "Cannot increase profile view count for the user itself"});
    } else {
        const user = await UserModel.findByIdAndUpdate(
            userId,
            {$inc : {profileViews: 1}},
            {new : true},
        )

        if (!user) return res.status(404).json({message: "User not found!"});
        else return res.status(200).json({message: "Profile view count updated!", profileViews : user.profileViews});
    }
}

const lastRefresh = async () => {
    try {
        const user = req.user;
        user.lastRefresh = Date.now();
        user.save();
        return res.status(200).json({message: "refresh successful"});
    } catch (error){
        console.log("Error Occurred during refreshing user:", error.message);
        console.log(error.stack);
        return res.json().status({message: "Could not refresh"});
    }
}

export {
    getUser,
    updateUserInfo,
    lastRefresh,
    changePassword,
    addProfileView,
}