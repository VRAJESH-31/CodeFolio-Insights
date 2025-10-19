import express from "express"
import { getProfiles, updateProfiles } from "../controllers/profiles.controller.js";

const router = express.Router();

router.get("/", getProfiles);
router.patch("/", updateProfiles);

export default router;