import express from "express"
import { getProfiles, updateProfiles, fetchProfilesData } from "../controllers/profiles.controller.js";

const router = express.Router();

router.get("/", getProfiles);
router.patch("/", updateProfiles);
router.get("/fetch", fetchProfilesData);

export default router;