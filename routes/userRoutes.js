// routes/userRoutes.js

import express from 'express';
import { registerUser, loginUser, uploadAssignment } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// User Registration and Login
router.post('/register', registerUser);
router.post('/login', loginUser);

// Upload Assignment (Protected)
router.post('/upload', protect, uploadAssignment);

export default router;