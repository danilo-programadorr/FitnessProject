// server/controllers/innovationController.js
import { generateInnovationResearch } from '../lib/openaiService.js';

export async function createInnovationIdeas(req, res) {
  const { marketData } = req.body;
  if (!marketData) return res.status(400).json({ error: 'Campo marketData obrigatório' });

  try {
    const ideas = await generateInnovationResearch(marketData);
    res.json({ ideas });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
