import express from 'express';
import * as CodeChefController from '../../controllers/platforms/codechef.controller.js';
import validate from '../../middlewares/validate.middleware.js';
import { usernameValidationSchema } from '../../validators/user.validate.js';

const router = express.Router();

router.get(
  '/user/profile',
  validate(usernameValidationSchema),
  CodeChefController.getUserInfo,
);
router.get(
  '/user/submissions',
  validate(usernameValidationSchema),
  CodeChefController.getUserSubmissions,
);

export default router;
