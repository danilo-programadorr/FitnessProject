// server/controllers/marketingController.js
import { generateMarketingPlan } from '../lib/openaiService.js';


export async function createMarketingPlan(req, res) {
  const { campaignData } = req.body;
  if (!campaignData) return res.status(400).json({ error: 'Campo campaignData obrigatório' });

  try {
    const plan = await generateMarketingPlan(campaignData);
    res.json({ plan });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
