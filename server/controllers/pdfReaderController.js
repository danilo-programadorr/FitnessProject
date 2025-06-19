// server/controllers/pdfReaderController.js
import { generatePdfReportAnalysis } from '../lib/pdfService.js';

export async function readPdfReport(req, res) {
  const { pdfBase64 } = req.body;
  if (!pdfBase64) return res.status(400).json({ error: 'Campo pdfBase64 obrigatório' });

  try {
    const report = await generatePdfReportAnalysis(pdfBase64);
    res.json({ report });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
