// server/routes/coach.js
import express from 'express';
import { coachChat } from '../controllers/coachController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/chat', authMiddleware, coachChat);

export default router;
