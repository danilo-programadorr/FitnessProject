// server/controllers/translatorController.js
import { generateTranslation } from '../lib/openaiService.js';

export async function translateText(req, res) {
  const { text, targetLanguage } = req.body;
  if (!text || !targetLanguage) return res.status(400).json({ error: 'Campos text e targetLanguage obrigatórios' });

  try {
    const translation = await generateTranslation({ text, targetLanguage });
    res.json({ translation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
