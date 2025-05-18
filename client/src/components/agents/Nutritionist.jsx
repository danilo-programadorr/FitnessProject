import { useState, useEffect } from 'react'
import { useAuthStore } from '../../context/AuthContext'
import { aiService } from '../../services/aiService'
import { Utensils, Plus, Minus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const NutritionistAgent = () => {
  const { user } = useAuthStore()
  const { t } = useTranslation()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [dietaryRestrictions, setDietaryRestrictions] = useState([])
  const [newRestriction, setNewRestriction] = useState('')
  const [nutritionGoals, setNutritionGoals] = useState({
    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 60
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])

    try {
      const context = [
        {
          role: 'system',
          content: `You are a professional nutritionist. The user has these dietary restrictions: ${dietaryRestrictions.join(', ')}. 
          Their daily goals: ${nutritionGoals.calories} calories, ${nutritionGoals.protein}g protein, ${nutritionGoals.carbs}g carbs, ${nutritionGoals.fat}g fat.
          Provide detailed meal plans and nutrition advice in the user's language: ${navigator.language}.`
        },
        ...messages,
        userMessage
      ]

      const response = await aiService.chatWithClaude(context)
      const aiMessage = response.content[0].text
      
      setMessages(prev => [...prev, { role: 'assistant', content: aiMessage }])
      await aiService.saveInteraction(user.id, 'nutritionist', input, aiMessage)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
      setInput('')
    }
  }

  const generateMealPlan = async () => {
    setIsLoading(true)
    const prompt = `Create a detailed 7-day meal plan for someone with these dietary restrictions: ${dietaryRestrictions.join(', ')}. 
    Daily goals: ${nutritionGoals.calories} calories, ${nutritionGoals.protein}g protein, ${nutritionGoals.carbs}g carbs, ${nutritionGoals.fat}g fat.
    Include breakfast, lunch, dinner and snacks with quantities and nutrition info. Format in markdown.`
    
    try {
      const response = await aiService.chatWithGPT([{ role: 'user', content: prompt }])
      const mealPlan = response.choices[0].message.content
      
      setMessages(prev => [...prev, 
        { role: 'assistant', content: mealPlan }
      ])
      await aiService.saveInteraction(user.id, 'nutritionist', prompt, mealPlan)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const addRestriction = () => {
    if (newRestriction.trim() && !dietaryRestrictions.includes(newRestriction)) {
      setDietaryRestrictions([...dietaryRestrictions, newRestriction])
      setNewRestriction('')
    }
  }

  const removeRestriction = (restriction) => {
    setDietaryRestrictions(dietaryRestrictions.filter(r => r !== restriction))
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full mr-4">
          <Utensils className="h-6 w-6 text-green-600 dark:text-green-300" />
        </div>
        <h2 className="text-xl font-bold dark:text-white">{t('agents.nutritionist')}</h2>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-3">{t('nutrition.dietary_restrictions')}</h3>
          <div className="flex mb-2">
            <input
              type="text"
              value={newRestriction}
              onChange={(e) => setNewRestriction(e.target.value)}
              placeholder={t('nutrition.add_restriction')}
              className="flex-1 p-2 border rounded-l"
            />
            <button
              onClick={addRestriction}
              className="bg-green-600 text-white px-3 rounded-r"
            >
              <Plus />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {dietaryRestrictions.map((restriction, idx) => (
              <span key={idx} className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
                {restriction}
                <button
                  onClick={() => removeRestriction(restriction)}
                  className="ml-1 text-red-500"
                >
                  <Minus size={16} />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-3">{t('nutrition.nutrition_goals')}</h3>
          {Object.entries(nutritionGoals).map(([key, value]) => (
            <div key={key} className="mb-2">
              <label className="block text-sm mb-1 capitalize">{t(`nutrition.${key}`)}</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setNutritionGoals({...nutritionGoals, [key]: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={generateMealPlan}
        disabled={isLoading}
        className="w-full mb-6 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 disabled:opacity-50"
      >
        {isLoading ? t('common.generating') + '...' : t('nutrition.generate_meal_plan')}
      </button>

      <div className="mb-6 h-96 overflow-y-auto p-4 border rounded-lg">
        {messages.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">{t('nutrition.nutrition_instructions')}</p>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`mb-4 p-3 rounded-lg ${msg.role === 'user' ? 'bg-green-50 dark:bg-green-900/30' : 'bg-gray-50 dark:bg-gray-700'}`}>
              <p className="font-medium">{msg.role === 'user' ? t('common.you') : t('agents.nutritionist')}:</p>
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
          placeholder={t('nutrition.ask_nutrition_question')}
          className="flex-1 p-2 border rounded"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {t('common.send')}
        </button>
      </form>
    </div>
  )
}