import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    userId : {
        type: mongoose.Types.ObjectId,
        ref: "users",
        require: true,
    },
    githubUsername : {
        type: String,
        default: "",
    },
    leetCodeUsername: {
        type: String,
        default: "",
    },
    gfgUsername: {
        type: String,
        default: "",
    },
    interviewbitUsername: {
        type: String,
        default: "",
    },
    codechefUsername: {
        type: String,
        default: "",
    }
}, {timestamps: true});

const ProfileModel = mongoose.model('profiles', ProfileSchema);

export default ProfileModel;