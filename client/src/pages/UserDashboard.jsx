import { WorkoutList } from '../components/workout/WorkoutList'
import { useUserStore } from '../stores/userStore'

export const UserDashboard = () => {
  const { user } = useUserStore()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 
        text-fitness-primary dark:text-fitness-dark-primary">
        Meus Treinos
      </h1>
      
      {user && <WorkoutList userId={user.id} />}
    </div>
  )
}