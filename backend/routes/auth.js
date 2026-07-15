import express from 'express';
import { login, getProfile, changePassword } from '../controllers/authController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/profile', protectAdmin, getProfile);
router.put('/change-password', protectAdmin, changePassword);

export default router;
