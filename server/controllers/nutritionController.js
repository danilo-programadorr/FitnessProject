import { generateMealPlan } from '../lib/geminiService.js';

const validGoals = ['gain_muscle', 'lose_weight', 'maintain_weight'];
const validDietTypes = ['high_protein', 'low_carb', 'balanced', 'keto', 'vegan'];

export async function createMealPlan(req, res) {
  const { goal, dietType } = req.body;

  // Validação
  if (!goal || !dietType) {
    return res.status(400).json({ error: 'Campos "goal" e "dietType" são obrigatórios.' });
  }

  if (!validGoals.includes(goal)) {
    return res.status(400).json({
      error: `O campo "goal" deve ser um dos seguintes: ${validGoals.join(', ')}.`
    });
  }

  if (!validDietTypes.includes(dietType)) {
    return res.status(400).json({
      error: `O campo "dietType" deve ser um dos seguintes: ${validDietTypes.join(', ')}.`
    });
  }

  try {
    const plan = await generateMealPlan({ goal, dietType });

    return res.status(200).json({
      success: true,
      message: 'Plano alimentar gerado com sucesso!',
      data: plan,
    });

  } catch (error) {
    console.error('Erro ao gerar plano alimentar:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao gerar o plano alimentar. Tente novamente.',
      details: error.message,
    });
  }
}
