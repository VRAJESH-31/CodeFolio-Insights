const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/AuthController');
const { signupValidation, loginValidation, validate } = require('../middlewares/AuthValidation');

router.post('/signup', signupValidation, validate, signup);
router.post('/login', loginValidation, validate, login);

module.exports = router;