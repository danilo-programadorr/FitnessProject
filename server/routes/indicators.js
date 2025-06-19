import express from 'express';
import { handleGenerateIndicatorsReport } from '../controllers/indicatorsController.js';

const router = express.Router();

router.post('/generate', handleGenerateIndicatorsReport);

export default router;
