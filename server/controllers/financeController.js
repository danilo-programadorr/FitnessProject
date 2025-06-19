// server/controllers/financeController.js
import { generateFinanceReport } from '../lib/openaiService.js';

export async function createFinanceReport(req, res) {
  const { financialData } = req.body;
  if (!financialData) return res.status(400).json({ error: 'Campo financialData obrigatório' });

  try {
    const report = await generateFinanceReport(financialData);
    res.json({ report });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
