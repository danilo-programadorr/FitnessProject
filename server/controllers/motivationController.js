// server/controllers/motivationController.js
import { generateMotivationalMessage } from '../lib/openaiService.js';

export async function createMotivationalMessage(req, res) {
  const { userMood } = req.body;
  if (!userMood) return res.status(400).json({ error: 'Campo userMood obrigatório' });

  try {
    const message = await generateMotivationalMessage(userMood);
    res.json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
