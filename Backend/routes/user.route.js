import express from 'express';
import {
  signupUser,
  signinUser,
  getUsers,
  deleteUser,
  getProfile,
  updateProfile,
} from '../controllers/user.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Authentication routes
router.post('/signup', signupUser);
router.post('/signin', signinUser);

// User profile routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

// Admin management routes
router.get('/', protect, admin, getUsers);
router.delete('/:id', protect, admin, deleteUser);

export default router;