import express from 'express';
import * as Code360Controller from '../../controllers/platforms/code360.controller.js';
import validate from '../../middlewares/validate.middleware.js';
import { usernameValidationSchema } from '../../validators/user.validate.js';
import { usernameAndYearQueryValidationSchema } from '../../validators/common.validate.js';

const router = express.Router();

router.get('/user/profile', validate(usernameValidationSchema), Code360Controller.getUserInfo);

router.get('/user/submissions', validate(usernameAndYearQueryValidationSchema), Code360Controller.getUserSubmissions);

export default router;
