import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { PORT } from './config/config.js';
import { authMiddleware } from './middleware/auth.js';

import authRoutes from './routes/auth.js';
import nutritionRoutes from './routes/nutrition.js';
import progressRoutes from './routes/progress.js';
import marketingRoutes from './routes/marketing.js';
import financeRoutes from './routes/finance.js';
import indicatorsRoutes from './routes/indicators.js';
import innovationRoutes from './routes/innovation.js';
import translatorRoutes from './routes/translator.js';
import userRoutes from './routes/user.js';
import { EventEmitter } from 'events';



const app = express();
app.use(cors());
app.use(express.json());
EventEmitter.defaultMaxListeners = 20; // ou outro valor maior

// Rotas públicas
app.use('/api/auth', authRoutes);

// Rotas privadas (protegidas)
app.use('/api/user', authMiddleware, userRoutes);
app.use('/api/nutrition', authMiddleware, nutritionRoutes);
app.use('/api/progress', authMiddleware, progressRoutes);
app.use('/api/marketing', authMiddleware, marketingRoutes);
app.use('/api/finance', authMiddleware, financeRoutes);
app.use('/api/indicators', authMiddleware, indicatorsRoutes);
app.use('/api/innovation', authMiddleware, innovationRoutes);
app.use('/api/translator', authMiddleware, translatorRoutes);



app.get('/', (req, res) => {
  res.send('API Liftrix rodando 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
