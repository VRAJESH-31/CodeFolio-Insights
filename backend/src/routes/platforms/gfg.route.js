import express from 'express';
import * as GfgController from '../../controllers/platforms/gfg.controller.js';
import validate from '../../middlewares/validate.middleware.js';
import { usernameValidationSchema } from '../../validators/user.validate.js';
import {
  usernameAndYearQueryValidationSchema,
  yearAndMonthQueryValidationSchema,
  institutionQueryValidationSchema,
} from '../../validators/common.validate.js';

const router = express.Router();

router.get(
  '/user/profile',
  validate(usernameValidationSchema),
  GfgController.getUserInfo,
);
router.get(
  '/user/submissions',
  validate(usernameAndYearQueryValidationSchema),
  GfgController.getUserSubmissions,
);
router.get(
  '/user/problems',
  validate(usernameValidationSchema),
  GfgController.getUserProblemsSolved,
);
router.get('/potd/today', GfgController.getQuestionOfToday);
router.get(
  '/potd/monthly',
  validate(yearAndMonthQueryValidationSchema),
  GfgController.getMonthlyPotds,
);
router.get(
  '/institution/info',
  validate(institutionQueryValidationSchema),
  GfgController.getInstitutionInfo,
);
router.get(
  '/institution/top-rankers',
  validate(institutionQueryValidationSchema),
  GfgController.getInstitutionTopThreeRankedUsers,
);

export default router;
