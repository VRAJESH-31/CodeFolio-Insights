import express from 'express';
import * as LeetCodeController from '../../controllers/platforms/leetcode.controller.js';
import validate from '../../middlewares/validate.middleware.js';
import { usernameValidationSchema } from '../../validators/user.validate.js';
import { usernameAndYearQueryValidationSchema, yearAndMonthQueryValidationSchema, paginationQueryValidationSchema, recentSubmissionsValidationSchema } from '../../validators/common.validate.js';

const router = express.Router();

router.get('/user/profile', validate(usernameValidationSchema), LeetCodeController.getUserProfile);

router.get('/user/language-stats', validate(usernameValidationSchema), LeetCodeController.getLanguageStats);

router.get('/user/calendar', validate(usernameAndYearQueryValidationSchema), LeetCodeController.getUserCalendar);

router.get('/user/recent-submissions', validate(recentSubmissionsValidationSchema), LeetCodeController.getRecentAcSubmissions);

router.get('/user/badges', validate(usernameValidationSchema), LeetCodeController.getUserBadges);

router.get('/user/contest-ranking', validate(usernameValidationSchema), LeetCodeController.getContestRanking);

router.get('/user/skill-stats', validate(usernameValidationSchema), LeetCodeController.getSkillStats);

router.get('/user/question-progress', validate(usernameValidationSchema), LeetCodeController.getUserProfileQuestionProgressV2);

router.get('/user/session-progress', validate(usernameValidationSchema), LeetCodeController.getUserSessionProgress);

router.get('/user/favorite-list', validate(usernameValidationSchema), LeetCodeController.getCreatedPublicFavoriteList);

router.get('/contest/rating-distribution', LeetCodeController.getContestRatingHistogram);

router.get('/coding-challenge/medal', validate(yearAndMonthQueryValidationSchema), LeetCodeController.getCodingChallengeMedal);

router.get('/potd/today', LeetCodeController.getQuestionOfToday);

router.get('/contests/upcoming', LeetCodeController.getUpcomingContests);

router.get('/rankings/global', validate(paginationQueryValidationSchema), LeetCodeController.getGlobalTopRankers);

export default router;
