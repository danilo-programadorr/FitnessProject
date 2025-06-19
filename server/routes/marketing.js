// server/routes/marketing.js
import express from 'express';
import { createMarketingPlan } from '../controllers/marketingController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/plan', authMiddleware, createMarketingPlan);

export default router;
