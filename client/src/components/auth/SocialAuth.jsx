import { supabase } from '../../services/supabaseClient'
import { useUserStore } from '../../stores/userStore'

export const SocialAuth = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSocialLogin = async (provider) => {
    setLoading(true)
    setError(null)
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin
      }
    })

    if (error) {
      setError(`Erro ao entrar com ${provider}: ${error.message}`)
    }
    setLoading(false)
  }

  return (
    <div className="space-y-3">
      <button
        onClick={() => handleSocialLogin('google')}
        disabled={loading}
        className="flex items-center justify-center w-full bg-red-500 text-white p-2 rounded disabled:opacity-50"
      >
        {loading ? 'Carregando...' : 'Entrar com Google'}
      </button>

      <button
  onClick={() => handleSocialLogin('google')}
  className="bg-fitness-primary hover:bg-fitness-dark-primary text-white py-2 px-4 rounded transition-colors"
>
  Entrar com Google
      </button>
      
      <button
        onClick={() => handleSocialLogin('github')}
        disabled={loading}
        className="flex items-center justify-center w-full bg-gray-800 text-white p-2 rounded disabled:opacity-50"
      >
        {loading ? 'Carregando...' : 'Entrar com GitHub'}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}