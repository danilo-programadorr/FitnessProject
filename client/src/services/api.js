import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Operações de treino
export const fetchWorkouts = async (userId) => {
  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .eq('user_id', userId)
  return { data, error }
}

// Adicione outros serviços aqui:
export const addWorkout = async (workoutData) => {
  // Implementação similar
}