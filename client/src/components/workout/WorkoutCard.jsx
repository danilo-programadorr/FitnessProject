import { useTheme } from '../context/ThemeContext' // Seu hook existente

export const WorkoutCard = ({ workout }) => {
  const { darkMode } = useTheme() // Supondo que seu tema retorne darkMode

  return (
    <div className={`
      p-4 rounded-lg transition-all duration-300
      ${darkMode ? 
        'bg-gray-800 border-fitness-dark-primary text-gray-100' : 
        'bg-white border-fitness-primary text-gray-900'}
      border-2 shadow-md hover:shadow-lg
    `}>
      <h3 className="text-lg font-bold">{workout.name}</h3>
      <p className="mt-2">{workout.description}</p>
      
      {/* Exemplo usando as cores do tema */}
      <div className={`mt-4 p-2 rounded 
        ${darkMode ? 
          'bg-fitness-dark-secondary' : 
          'bg-fitness-secondary'}
      `}>
        Dificuldade: {workout.difficulty}
      </div>
    </div>
  )
}