import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from "../config/config.js";
import fs from "fs";

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

const extractPublicId = (url,  topFolder) => {
    // url example : https://res.cloudinary.com/dvjkkh0tf/image/upload/v1761793971/Codefolio/Profiles/fbmrlx7ejdaugrxy9x7m.png Codefolio/Profiles/fbmrlx7ejdaugrxy9x7m
    const urlTrimmed = url.split(".")[2];  // urlTrimmed: com/dvjkkh0tf/image/upload/v1761793971/Codefolio/Profiles/fbmrlx7ejdaugrxy9x7m
    if (!topFolder) return urlTrimmed.split("/").at(-1);   // return fbmrlx7ejdaugrxy9x7m
    const publicId = topFolder + urlTrimmed.split(topFolder)[1];    // publicId : fbmrlx7ejdaugrxy9x7m
    return publicId;
}

const uploadFile = async (filePath, folder) => {
    const uploadedResponse = await cloudinary.uploader.upload(filePath, {
        folder: folder,
    });

    fs.unlinkSync(filePath);

    return uploadedResponse.secure_url;
}

const destroyFile = async (url, topFolder) => {
    const publicId = extractPublicId(url, topFolder);
    await cloudinary.uploader.destroy(publicId);
}

export {
    uploadFile,
    destroyFile,
};