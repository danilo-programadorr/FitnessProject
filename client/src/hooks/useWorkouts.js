import { useEffect } from 'react'
import { useWorkoutStore } from '../stores/useWorkoutStore'

export const useWorkouts = (userId) => {
  const { workouts, loading, error, fetchWorkouts } = useWorkoutStore()

  useEffect(() => {
    if (userId) fetchWorkouts(userId)
  }, [userId, fetchWorkouts])

  return { workouts, loading, error }
}