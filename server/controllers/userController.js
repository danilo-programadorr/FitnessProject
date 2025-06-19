import { supabase } from '../config/supabaseClient.js';

export const getUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data) {
      return res.status(401).json({ message: 'Token inválido ou expirado', error });
    }

    res.status(200).json({
      user: data.user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno no servidor', error });
  }
};
