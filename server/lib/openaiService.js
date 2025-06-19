// lib/openaiService.js

import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../config/config.js';

export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// ✅ Agente de Indicadores
export async function generateIndicatorAnalysis({ indicatorData }) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em análise de indicadores de desempenho de academias. Forneça uma análise detalhada e sugestões de melhoria.',
        },
        {
          role: 'user',
          content: `Aqui estão os dados dos indicadores: ${JSON.stringify(indicatorData)}. Gere uma análise detalhada.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Erro na geração de análise de indicadores:', error);
    throw new Error('Erro ao gerar a análise de indicadores');
  }
}

// ✅ Agente de Nutrição
export async function generateMealPlan({ goal, preferences }) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: 'Você é um nutricionista especializado em academias. Forneça aconselhamento nutricional baseado nos dados fornecidos.',
        },
        {
          role: 'user',
          content: `Aqui estão os dados nutricionais: ${JSON.stringify(nutritionData)}. Gere conselhos e recomendações.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Erro na geração do aconselhamento nutricional:', error);
    throw new Error('Erro ao gerar aconselhamento nutricional');
  }
}
// ✅ Agente Financeiro
export async function generateFinanceReport(financeData) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em análise financeira para academias. Gere um relatório financeiro detalhado e sugestões.',
        },
        {
          role: 'user',
          content: `Dados financeiros: ${JSON.stringify(financeData)}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Erro na geração do relatório financeiro:', error);
    throw new Error('Erro ao gerar relatório financeiro');
  }
}


// ✅ Agente de Progresso
export async function generateProgressAnalysis({ progressData }) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: 'Você é um personal trainer especializado em análise de progresso. Forneça feedback detalhado e sugestões.',
        },
        {
          role: 'user',
          content: `Aqui estão meus dados de progresso: ${JSON.stringify(progressData)}. Gere uma análise e sugestões.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Erro na geração da análise de progresso:', error);
    throw new Error('Erro ao gerar a análise de progresso');
  }
}

// ✅ Agente Motivacional
export async function generateMotivationalMessage({ userGoal }) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: 'Você é um coach motivacional. Crie uma mensagem inspiradora e motivadora para quem busca atingir objetivos na academia.',
        },
        {
          role: 'user',
          content: `Meu objetivo é ${userGoal}. Me envie uma mensagem motivacional.`,
        },
      ],
      temperature: 0.9,
      max_tokens: 500,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Erro na geração da mensagem motivacional:', error);
    throw new Error('Erro ao gerar a mensagem motivacional');
  }
}
// ✅ Agente de Marketing
export async function generateMarketingPlan({ businessData }) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em marketing digital para academias. Crie um plano de marketing completo, incluindo estratégias online, redes sociais, campanhas, fidelização e sugestões práticas.',
        },
        {
          role: 'user',
          content: `Aqui estão os dados da academia: ${JSON.stringify(businessData)}. Gere um plano de marketing detalhado e eficiente.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Erro na geração do plano de marketing:', error);
    throw new Error('Erro ao gerar o plano de marketing');
  }
}
// ✅ Agente Leitor de Laudos PDF
export async function generatePdfReportAnalysis(pdfTextData) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em interpretação de laudos médicos em academias. Analise o texto do laudo e forneça um resumo e recomendações.',
        },
        {
          role: 'user',
          content: `Texto extraído do PDF: ${pdfTextData}. Faça a análise detalhada.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Erro na geração da análise do laudo PDF:', error);
    throw new Error('Erro ao gerar análise do laudo PDF');
  }
}
// ✅ Agente Coach Virtual com voz realista (análise e sugestões motivacionais e de treino)
export async function generateCoachVirtualFeedback(userData) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: 'Você é um coach virtual com voz realista, especialista em fitness e motivação. Forneça feedback detalhado, motivacional e sugestões personalizadas de treino.',
        },
        {
          role: 'user',
          content: `Aqui estão os dados do usuário: ${JSON.stringify(userData)}. Gere um feedback detalhado e motivacional.`,
        },
      ],
      temperature: 0.8,
      max_tokens: 1000,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Erro na geração do feedback do coach virtual:', error);
    throw new Error('Erro ao gerar feedback do coach virtual');
  }
}

// ✅ Agente de Inovação e Pesquisa de Concorrência
export async function generateInnovationResearch(marketData) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em inovação e pesquisa de concorrência para o mercado fitness. Forneça insights sobre tendências, inovações e análise da concorrência.',
        },
        {
          role: 'user',
          content: `Dados do mercado e concorrência: ${JSON.stringify(marketData)}. Gere um relatório detalhado de pesquisa e inovação.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Erro na geração da pesquisa de inovação:', error);
    throw new Error('Erro ao gerar pesquisa de inovação');
  }
}
// ✅ Agente Tradutor / Guia
export async function generateTranslation({ text, targetLanguage }) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: 'Você é um tradutor bilíngue que traduz textos de qualquer idioma para o idioma alvo com alta precisão e naturalidade.',
        },
        {
          role: 'user',
          content: `Por favor, traduza o seguinte texto para ${targetLanguage}: "${text}"`,
        },
      ],
      temperature: 0.3,
      max_tokens: 500,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Erro na geração da tradução:', error);
    throw new Error('Erro ao gerar a tradução');
  }
}
