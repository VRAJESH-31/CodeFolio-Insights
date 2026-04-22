import express from 'express';
import * as InterviewBitController from '../../controllers/platforms/interviewbit.controller.js';
import validate from '../../middlewares/validate.middleware.js';
import { usernameValidationSchema } from '../../validators/user.validate.js';
import { usernameAndYearQueryValidationSchema } from '../../validators/common.validate.js';

const router = express.Router();

router.get(
  '/user/profile',
  validate(usernameValidationSchema),
  InterviewBitController.getUserInfo,
);
router.get(
  '/user/submissions',
  validate(usernameAndYearQueryValidationSchema),
  InterviewBitController.getUserSubmissions,
);
router.get(
  '/user/badges',
  validate(usernameValidationSchema),
  InterviewBitController.getUserBadges,
);

export default router;
