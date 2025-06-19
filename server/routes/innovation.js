// server/routes/innovation.js
import express from 'express';
import { createInnovationIdeas } from '../controllers/innovationController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/ideas', authMiddleware, createInnovationIdeas);

export default router;
