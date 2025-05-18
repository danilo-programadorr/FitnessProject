// src/components/Auth.jsx
import { supabase } from '../services/supabaseClient'

export default function Auth() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'admin@email.com',
      password: '12345@'
    })
    if (error) alert(error.message)
  }

  return (
    <div className="space-y-4">
      <button 
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Entrar
      </button>
    </div>
  )
}