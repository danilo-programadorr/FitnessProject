// server/controllers/coachController.js
import { generateCoachVirtualFeedback } from '../lib/openaiService.js';

export async function coachChat(req, res) {
  const { message, userContext } = req.body;
  if (!message) return res.status(400).json({ error: 'Campo message obrigatório' });

  try {
    const response = await generateCoachVirtualFeedback({ message, userContext });
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
