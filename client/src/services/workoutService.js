import { supabase } from './supabaseClient'

export const WorkoutService = {
  async fetchAll(userId) {
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw new Error(error.message)
    return data
  },

  async create(workoutData) {
    const { data, error } = await supabase
      .from('workouts')
      .insert(workoutData)
    
    if (error) throw new Error(error.message)
    return data
  }
}