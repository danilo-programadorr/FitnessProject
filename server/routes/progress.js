// server/routes/progress.js
import express from 'express';
import { createProgressReport } from '../controllers/progressController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/report', authMiddleware, createProgressReport);

export default router;
