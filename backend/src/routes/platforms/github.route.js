import express from 'express';
import * as GithubController from '../../controllers/platforms/github.controller.js';
import validate from '../../middlewares/validate.middleware.js';
import { usernameValidationSchema } from '../../validators/user.validate.js';

const router = express.Router();

router.get('/user/badges', validate(usernameValidationSchema), GithubController.getGithubBadges);

export default router;
