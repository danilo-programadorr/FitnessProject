import { supabase } from './supabaseClient'

const AI_SERVICE_BASE_URL = 'https://api.openai.com/v1'
const CLAUDE_API_URL = 'https://api.anthropic.com/v1'

export const aiService = {
  // Configuração comum para headers
  getHeaders: () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
  }),

  // GPT-4 Turbo
  async chatWithGPT(messages, model = 'gpt-4-turbo') {
    try {
      const response = await fetch(`${AI_SERVICE_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7
        })
      })
      return await response.json()
    } catch (error) {
      console.error('Error calling GPT API:', error)
      throw error
    }
  },

  // Claude 3
  async chatWithClaude(prompt, model = 'claude-3-opus-20240229') {
    try {
      const response = await fetch(CLAUDE_API_URL + '/messages', {
        method: 'POST',
        headers: {
          ...this.getHeaders(),
          'x-api-key': import.meta.env.VITE_CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model,
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }]
        })
      })
      return await response.json()
    } catch (error) {
      console.error('Error calling Claude API:', error)
      throw error
    }
  },

  // Whisper (transcrição de áudio)
  async transcribeAudio(file) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('model', 'whisper-1')

      const response = await fetch(`${AI_SERVICE_BASE_URL}/audio/transcriptions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: formData
      })
      return await response.json()
    } catch (error) {
      console.error('Error calling Whisper API:', error)
      throw error
    }
  },

  // TTS (Text-to-Speech)
  async generateSpeech(text, voice = 'alloy') {
    try {
      const response = await fetch(`${AI_SERVICE_BASE_URL}/audio/speech`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          model: 'tts-1',
          input: text,
          voice
        })
      })
      return await response.blob()
    } catch (error) {
      console.error('Error calling TTS API:', error)
      throw error
    }
  },

  // Armazenar histórico de interações no Supabase
  async saveInteraction(userId, agentType, input, output) {
    const { error } = await supabase
      .from('ai_interactions')
      .insert({
        user_id: userId,
        agent_type: agentType,
        user_input: input,
        ai_output: output,
        created_at: new Date().toISOString()
      })

    if (error) throw error
  }
}