import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateMealPlan({ goal, dietType }) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `
    Crie um plano alimentar detalhado para uma pessoa cujo objetivo é ${goal} com uma dieta do tipo ${dietType}.
    Especifique café da manhã, almoço, jantar e lanches. Considere boas práticas nutricionais e equilíbrio dos nutrientes.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error('Erro ao gerar o plano alimentar:', error);
    throw error;
  }
}
