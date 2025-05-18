import { useState, useEffect } from 'react'
import { useAuthStore } from '../../context/AuthContext'
import { aiService } from '../../services/aiService'
import { Dumbbell, TrendingUp, Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const PersonalTrainerAgent = () => {
  const { user } = useAuthStore()
  const { t } = useTranslation()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [userProfile, setUserProfile] = useState({
    level: 'beginner',
    goal: 'muscle_gain',
    daysPerWeek: 3,
    equipment: ['dumbbells', 'resistance_bands']
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])

    try {
      // Montar o contexto para o personal trainer
      const context = [
        {
          role: 'system',
          content: `You are an expert personal trainer. The user is a ${userProfile.level} level with goal of ${userProfile.goal}. 
          They can train ${userProfile.daysPerWeek} days per week and have access to: ${userProfile.equipment.join(', ')}. 
          Provide detailed workout plans in the user's language: ${navigator.language}.`
        },
        ...messages,
        userMessage
      ]

      const response = await aiService.chatWithGPT(context)
      const aiMessage = response.choices[0].message
      
      setMessages(prev => [...prev, aiMessage])
      await aiService.saveInteraction(user.id, 'personal_trainer', input, aiMessage.content)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
      setInput('')
    }
  }

  const generateWorkoutPlan = async () => {
    setIsLoading(true)
    const prompt = `Generate a ${userProfile.daysPerWeek}-day workout plan for a ${userProfile.level} user aiming for ${userProfile.goal}. 
    Available equipment: ${userProfile.equipment.join(', ')}. Provide in markdown format with exercises, sets, reps, and rest periods.`
    
    try {
      const response = await aiService.chatWithClaude(prompt)
      const workoutPlan = response.content[0].text
      
      setMessages(prev => [...prev, 
        { role: 'assistant', content: workoutPlan }
      ])
      await aiService.saveInteraction(user.id, 'personal_trainer', prompt, workoutPlan)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full mr-4">
          <Dumbbell className="h-6 w-6 text-blue-600 dark:text-blue-300" />
        </div>
        <h2 className="text-xl font-bold dark:text-white">{t('agents.personal_trainer')}</h2>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg">
          <label className="block mb-2 font-medium">{t('fitness.level')}</label>
          <select 
            value={userProfile.level}
            onChange={(e) => setUserProfile({...userProfile, level: e.target.value})}
            className="w-full p-2 border rounded"
          >
            <option value="beginner">{t('fitness.beginner')}</option>
            <option value="intermediate">{t('fitness.intermediate')}</option>
            <option value="advanced">{t('fitness.advanced')}</option>
          </select>
        </div>

        <div className="p-4 border rounded-lg">
          <label className="block mb-2 font-medium">{t('fitness.goal')}</label>
          <select 
            value={userProfile.goal}
            onChange={(e) => setUserProfile({...userProfile, goal: e.target.value})}
            className="w-full p-2 border rounded"
          >
            <option value="muscle_gain">{t('fitness.muscle_gain')}</option>
            <option value="weight_loss">{t('fitness.weight_loss')}</option>
            <option value="endurance">{t('fitness.endurance')}</option>
          </select>
        </div>

        <div className="p-4 border rounded-lg">
          <label className="block mb-2 font-medium">
            <Calendar className="inline mr-2" />
            {t('fitness.days_per_week')}
          </label>
          <input
            type="number"
            min="1"
            max="7"
            value={userProfile.daysPerWeek}
            onChange={(e) => setUserProfile({...userProfile, daysPerWeek: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <button
        onClick={generateWorkoutPlan}
        disabled={isLoading}
        className="w-full mb-6 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
      >
        {isLoading ? (
          <span>{t('common.generating')}...</span>
        ) : (
          <>
            <TrendingUp className="mr-2" />
            <span>{t('fitness.generate_plan')}</span>
          </>
        )}
      </button>

      <div className="mb-6 h-96 overflow-y-auto p-4 border rounded-lg">
        {messages.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">{t('fitness.pt_instructions')}</p>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`mb-4 p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-gray-50 dark:bg-gray-700'}`}>
              <p className="font-medium">{msg.role === 'user' ? t('common.you') : t('agents.personal_trainer')}:</p>
              <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br>') }} />
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('fitness.ask_question')}
          className="flex-1 p-2 border rounded"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {t('common.send')}
        </button>
      </form>
    </div>
  )
}