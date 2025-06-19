// server/routes/finance.js
import express from 'express';
import { createFinanceReport } from '../controllers/financeController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/report', authMiddleware, createFinanceReport);

export default router;
