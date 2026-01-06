import express from 'express';
import { authMiddleware } from '../middleware.js';
import { getProfile, updateProfile } from '../controllers/authController.js';
import { updateProfileValidator, validate } from '../validators.js';

const router = express.Router();

// Get user profile
router.get('/me', authMiddleware, getProfile);

// Update user profile
router.patch('/me', authMiddleware, updateProfileValidator, validate, updateProfile);

export default router;
