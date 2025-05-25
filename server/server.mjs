import 'dotenv/config';
import express from 'express';
import os from 'os';
import https from 'https';
import fs from 'fs';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:3000', // URL do frontend
  credentials: true
}));

// Middleware
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'API funcionando!' });
});


// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'active',
    port: PORT,
    networkInterfaces: os.networkInterfaces(),
    timestamp: new Date().toISOString()
  });
});

// Função para obter o IP da máquina
function getIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

// ✅ CONFIGURAÇÃO HTTPS
const httpsOptions = {
  key: fs.readFileSync('./certs/privkey.pem'),
  cert: fs.readFileSync('./certs/fullchain.pem'),
};

// ✅ INICIALIZAÇÃO COM HTTPS
https.createServer(httpsOptions, app).listen(PORT, '0.0.0.0', () => {
  console.log(`
  🔒 HTTPS rodando com sucesso!
  - Local:    https://localhost:${PORT}/api/health
  - Rede:     https://${getIpAddress()}:${PORT}/api/health
  `);
});

// Tratamento de erros
process.on('unhandledRejection', (err) => {
  console.error('Erro não tratado:', err);
});
