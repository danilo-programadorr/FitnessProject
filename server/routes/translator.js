// server/routes/translator.js
import express from 'express';
import { translateText } from '../controllers/translatorController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/translate', authMiddleware, translateText);

export default router;
