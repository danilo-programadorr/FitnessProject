import { create } from 'zustand'
import { supabase } from '../services/supabaseClient'

export const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: true,
  error: null,

  login: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      set({ user: data.user, session: data.session, error: null })
    } catch (error) {
      set({ error: error.message })
    }
  },

  signUp: async (email, password, name) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } }
      })
      if (error) throw error
      set({ user: data.user, error: null })
    } catch (error) {
      set({ error: error.message })
    }
  },

  logout: async () => {
    await supabase.auth.signOut()
    set({ user: null, session: null })
  },

  checkAuth: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      set({ session, user: session?.user ?? null, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  }
}))