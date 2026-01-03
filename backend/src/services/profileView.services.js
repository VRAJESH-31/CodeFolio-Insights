import ProfileViewModel from "../models/profileView.model";
import { v4 as uuid } from "uuid";

const PROFILE_VIEW_COOLDOWN_MS = 10 * 60 * 1000;


const addProfileView = async (vieweeId, viewerId, viewerDeviceToken) => {
    try {
        let query;
        let viewerType;
        let generatedDeviceToken;

        if (viewerId){
            query = { viewerId, vieweeId };
            viewerType = "user";
        } else {
            if (!viewerDeviceToken) {
                generatedDeviceToken = uuid();
                viewerDeviceToken = generatedDeviceToken;
            }

            query = { viewerDeviceToken, vieweeId };
            viewerType = "device";
        }

        // Checking if the profile view count is already present
        const profileViewCount = await ProfileViewModel.findOne(query);

        if (profileViewCount) {
            if (profileViewCount.lastSeenAt.getTime() + PROFILE_VIEW_COOLDOWN_MS < new Date().getTime()) {
                profileViewCount.count += 1;
                profileViewCount.lastSeenAt = new Date();
                await profileViewCount.save();
            }
        } else {
            await ProfileViewModel.create({ ...query, viewerType, count: 1, lastSeenAt: new Date() });
        }

        return generatedDeviceToken;
    } catch (error){
        console.log("Error occurred while adding a profile view:", error.message);
        console.log(error.stack);
        return null;
    }
}

export {
    addProfileView
}