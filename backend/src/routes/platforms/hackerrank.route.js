import express from 'express';
import * as HackerRankController from '../../controllers/platforms/hackerrank.controller.js';
import validate from '../../middlewares/validate.middleware.js';
import { usernameValidationSchema } from '../../validators/user.validate.js';

const router = express.Router();

router.get('/user/profile', validate(usernameValidationSchema), HackerRankController.getUserInfo);

export default router;
