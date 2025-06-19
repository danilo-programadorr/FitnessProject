// server/controllers/progressController.js
import { generateProgressAnalysis } from '../lib/openaiService.js';

export async function createProgressReport(req, res) {
  const { userData } = req.body;
  if (!userData) return res.status(400).json({ error: 'Campo userData obrigatório' });

  try {
    const report = await generateProgressAnalysis({ progressData });
    res.json({ report });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
