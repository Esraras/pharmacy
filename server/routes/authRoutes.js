import express from 'express';
import { registerUser, loginUser, logoutUser, getUserInfo } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', protect, logoutUser);
router.get('/user-info', protect, getUserInfo);

export default router;