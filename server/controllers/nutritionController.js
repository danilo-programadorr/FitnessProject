import { generateMealPlan } from '../lib/openaiService.js';

export async function createMealPlan(req, res) {
  const { goal, dietType } = req.body;

  if (!goal || !dietType) {
    return res.status(400).json({ error: 'goal e dietType são obrigatórios' });
  }

  try {
    const plan = await generateMealPlan({ goal, dietType });
    res.json({ plan });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
