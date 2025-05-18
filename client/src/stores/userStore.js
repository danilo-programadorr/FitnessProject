import { create } from 'zustand'

export const useUserStore = create((set) => ({
  user: null,
  workouts: [],
  
  // Ações
  setUser: (userData) => set({ user: userData }),
  
  fetchUserWorkouts: async (userId) => {
    const { data } = await fetchWorkouts(userId) // Usando o serviço API
    set({ workouts: data })
  },
  
  clearUser: () => set({ user: null, workouts: [] })
}))