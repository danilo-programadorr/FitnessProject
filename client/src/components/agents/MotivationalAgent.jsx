import { useState, useRef, useEffect } from 'react'
import { useAuthStore } from '../../context/AuthContext'
import { aiService } from '../../services/aiService'
import { Mic, Volume2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const MotivationalAgent = () => {
  const { user } = useAuthStore()
  const { t, i18n } = useTranslation()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const audioRef = useRef(null)
  const [voice, setVoice] = useState('alloy')

  const voices = [
    { id: 'alloy', name: t('voice.alloy') },
    { id: 'echo', name: t('voice.echo') },
    { id: 'fable', name: t('voice.fable') },
    { id: 'onyx', name: t('voice.onyx') },
    { id: 'nova', name: t('voice.nova') },
    { id: 'shimmer', name: t('voice.shimmer') }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])

    try {
      const response = await aiService.chatWithGPT([
        {
          role: 'system',
          content: `You are a motivational coach. Respond with encouraging, positive messages in ${i18n.language}. 
          Keep responses under 3 sentences. Use an enthusiastic tone.`
        },
        ...messages,
        userMessage
      ])
      
      const aiMessage = response.choices[0].message
      setMessages(prev => [...prev, aiMessage])
      await aiService.saveInteraction(user.id, 'motivational', input, aiMessage.content)
      
      // Gerar áudio da resposta
      const audioBlob = await aiService.generateSpeech(aiMessage.content, voice)
      const audioUrl = URL.createObjectURL(audioBlob)
      audioRef.current.src = audioUrl
      audioRef.current.play()
      setIsSpeaking(true)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
      setInput('')
    }
  }

  const generateMotivationalQuote = async () => {
    setIsLoading(true)
    const prompt = `Generate a short motivational quote in ${i18n.language} about fitness and health. Max 2 sentences.`
    
    try {
      const response = await aiService.chatWithClaude([{ role: 'user', content: prompt }])
      const quote = response.content[0].text
      
      setMessages(prev => [...prev, 
        { role: 'assistant', content: quote }
      ])
      await aiService.saveInteraction(user.id, 'motivational', prompt, quote)
      
      const audioBlob = await aiService.generateSpeech(quote, voice)
      const audioUrl = URL.createObjectURL(audioBlob)
      audioRef.current.src = audioUrl
      audioRef.current.play()
      setIsSpeaking(true)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.onended = () => setIsSpeaking(false)
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <audio ref={audioRef} className="hidden" />
      
      <div className="flex items-center mb-6">
        <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full mr-4">
          <Volume2 className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
        </div>
        <h2 className="text-xl font-bold dark:text-white">{t('agents.motivational')}</h2>
      </div>

      <div className="mb-4">
        <label className="block mb-2">{t('voice.select_voice')}</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {voices.map((v) => (
            <button
              key={v.id}
              onClick={() => setVoice(v.id)}
              className={`p-2 border rounded ${voice === v.id ? 'bg-blue-100 dark:bg-blue-900 border-blue-500' : ''}`}
            >
              {v.name}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={generateMotivationalQuote}
        disabled={isLoading}
        className="w-full mb-6 bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-600 disabled:opacity-50"
      >
        {isLoading ? t('common.generating') + '...' : t('motivation.get_quote')}
      </button>

      <div className="mb-6 h-64 overflow-y-auto p-4 border rounded-lg">
        {messages.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">{t('motivation.instructions')}</p>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`mb-4 p-3 rounded-lg ${msg.role === 'user' ? 'bg-yellow-50 dark:bg-yellow-900/30' : 'bg-gray-50 dark:bg-gray-700'}`}>
              <p className="font-medium">{msg.role === 'user' ? t('common.you') : t('agents.motivational')}:</p>
              <p>{msg.content}</p>
              {msg.role === 'assistant' && (
                <button
                  onClick={async () => {
                    const audioBlob = await aiService.generateSpeech(msg.content, voice)
                    const audioUrl = URL.createObjectURL(audioBlob)
                    audioRef.current.src = audioUrl
                    audioRef.current.play()
                    setIsSpeaking(true)
                  }}
                  className="mt-2 text-sm flex items-center text-blue-600 dark:text-blue-400"
                  disabled={isSpeaking}
                >
                  <Mic className="mr-1" size={14} />
                  {t('voice.play_again')}
                </button>
              )}
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('motivation.ask_for_advice')}
          className="flex-1 p-2 border rounded"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || isSpeaking}
          className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 disabled:opacity-50"
        >
          {t('common.send')}
        </button>
      </form>
    </div>
  )
}