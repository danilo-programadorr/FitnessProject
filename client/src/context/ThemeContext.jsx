import { create } from 'zustand'
import { useEffect } from 'react'

export const useThemeStore = create((set) => ({
  darkMode: false,
  toggleDarkMode: () => set((state) => {
    const newMode = !state.darkMode
    localStorage.setItem('darkMode', newMode)
    return { darkMode: newMode }
  }),
}))

export const useThemeEffect = () => {
  const { darkMode, toggleDarkMode } = useThemeStore()

  useEffect(() => {
    // Verificar preferência salva ou do sistema
    const savedMode = localStorage.getItem('darkMode')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const initialMode = savedMode !== null 
      ? JSON.parse(savedMode) 
      : systemPrefersDark
      
    if (initialMode !== darkMode) {
      toggleDarkMode()
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])
}