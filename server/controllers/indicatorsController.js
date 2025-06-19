// server/controllers/indicatorsController.js
import { generateIndicatorAnalysis } from '../lib/openaiService.js';

export async function handleGenerateIndicatorsReport(req, res) {
  const { indicatorData } = req.body;

  if (!indicatorData) {
    return res.status(400).json({ error: 'Campo indicatorData obrigatório' });
  }

  try {
    const analysis = await generateIndicatorAnalysis({ indicatorData });
    res.json({ analysis });
  } catch (error) {
    console.error('Erro ao gerar relatório de indicadores:', error);
    res.status(500).json({ error: error.message });
  }
}
