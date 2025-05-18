import { WorkoutCard } from './WorkoutCard'
import { useWorkouts } from '../../hooks/useWorkouts'

export const WorkoutList = ({ userId }) => {
  const { workouts, loading } = useWorkouts(userId)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {workouts.map(workout => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  )
}