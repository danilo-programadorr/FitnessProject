// server/routes/motivation.js
import express from 'express';
import { createMotivationalMessage } from '../controllers/motivationController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/message', authMiddleware, createMotivationalMessage);

export default router;
