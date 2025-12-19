import express from 'express';
import { register, login, logout, getSession, forgetPassword, resetPassword } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', login);

// Protected routes
router.post('/logout', requireAuth, logout);
// Protected routes
router.post('/logout', requireAuth, logout);
router.get('/session', requireAuth, getSession);

// Password Reset
router.post('/forget-password', forgetPassword);
router.post('/reset-password', resetPassword);

export default router;
