export const getApiConfig = () => ({
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    key: import.meta.env.VITE_SUPABASE_KEY
  },
  openai: {
    key: import.meta.env.VITE_OPENAI_API_KEY || 'mock_key_for_dev'
  }
});