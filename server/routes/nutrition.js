import express from 'express';
import { createMealPlan } from '../controllers/nutritionController.js';

const router = express.Router();

router.post('/meal-plan', createMealPlan);

export default router;
