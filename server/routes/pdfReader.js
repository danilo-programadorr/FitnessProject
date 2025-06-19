// server/routes/pdfReader.js
import express from 'express';
import { readPdfReport } from '../controllers/pdfReaderController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/read', authMiddleware, readPdfReport);

export default router;
