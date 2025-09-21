import express from "express";
import { signup, login } from "../controllers/auth.controller.js";
import { signupValidation, loginValidation, validate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/signup', signupValidation, validate, signup);
router.post('/login', loginValidation, validate, login);

export default router;