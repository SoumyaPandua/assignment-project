// routes/adminRoutes.js

import express from 'express';
import { registerAdmin, loginAdmin, getAssignments, acceptAssignment, rejectAssignment } from '../controllers/adminController.js';
import { protect, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Admin Registration and Login
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Assignment Management (Protected & Admin Only)
router.get('/assignments', protect, isAdmin, getAssignments);
router.post('/assignments/:id/accept', protect, isAdmin, acceptAssignment);
router.post('/assignments/:id/reject', protect, isAdmin, rejectAssignment);

export default router;