import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    userId : {
        type: mongoose.Types.ObjectId,
        ref: "users",
        require: true,
    },
    linkedinUsername : {
        type: String,
        default: "",
    },
    twitterUsername : {
        type: String,
        default: "",
    },
    portfolioWebsiteLink: {
        type: String,
        default: "",
    },
    resumeLink: {
        type: String,
        default: "",
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
    },
    hackerrankUsername: {
        type: String,
        default: "",
    },
    codeforcesUsername: {
        type: String,
        default: "",
    },
    code360Username: {
        type: String,
        default: "",
    }
}, {timestamps: true});

const ProfileModel = mongoose.model('profiles', ProfileSchema);

export default ProfileModel;