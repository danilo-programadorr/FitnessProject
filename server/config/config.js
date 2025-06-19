import 'dotenv/config';

export const PORT = process.env.PORT || 5000;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const SUPABASE_URL = process.env.SUPABASE_URL;
export const SUPABASE_KEY = process.env.SUPABASE_KEY;
export const API_KEY = process.env.API_KEY; // Chave para autenticação das rotas protegidas
