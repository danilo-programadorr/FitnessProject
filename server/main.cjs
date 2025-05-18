const express = require('express')
const app = express()

app.get('/api/test', (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'API recriada com sucesso!',
    timestamp: new Date().toISOString()
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`
   Servidor rodando na porta ${PORT}
   Teste em: http://localhost:${PORT}/api/test
  `)
})
