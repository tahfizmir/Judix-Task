import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { signupValidator, loginValidator, validate } from '../validators.js';

const router = express.Router();

// Sign up
router.post('/signup', signupValidator, validate, signup);

// Login
router.post('/login', loginValidator, validate, login);

export default router;
