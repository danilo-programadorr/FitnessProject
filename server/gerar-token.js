// gerar-token.js
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const token = jwt.sign(
  { id: 'user123', email: 'teste@liftrix.com' },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

console.log('Token JWT:', token);
