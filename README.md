# 🏋️‍♂️ **FitnessServer - API Backend para Projeto Fitness**

![Node.js](https://img.shields.io/badge/node-%3E=18.x-green)
![Express](https://img.shields.io/badge/express-4.x-blue)
[![License](https://img.shields.io/github/license/danilo-programadorr/FitnessServer)](https://github.com/danilo-programadorr/FitnessServer)


🚀 Este é o backend do projeto **FitnessServer**, uma API robusta desenvolvida em **Node.js + Express** que conecta o frontend a serviços externos como **Supabase, Stripe, OpenAI, Google Cloud e Fish.audio**. 

> 🔥 Perfeito para desenvolvimento de plataformas fitness, SaaS, apps de treino ou qualquer projeto que envolva autenticação, pagamentos, IA e funcionalidades escaláveis.

---

## 📁 **Estrutura do Projeto**

```
/fitnessServer
  /server
    /certs              → Certificados SSL (local, ignorado no git)
    /src
      /config           → Configurações (ex.: Supabase)
      /controllers      → Controllers da API
      /middleware       → Middlewares (auth, rate limit, etc.)
      /routes           → Rotas da API
      /services         → Serviços externos (OpenAI, Stripe, etc.)
      /utils            → Funções auxiliares
      app.js            → Configuração principal do Express
      server.js         → Inicialização do servidor
  /client               → Frontend (React + Vite)
  .env.local            → Variáveis de ambiente (IGNORADO no git)
  package.json          → Dependências
  README.md             → Este arquivo
```

---

## 🔑 **Requisitos**

- ✔️ Node.js **v18 ou superior**  
- ✔️ npm ou yarn  
- ✔️ Git  
- ✔️ Supabase (para banco de dados e autenticação)  
- ✔️ Stripe (para pagamentos)  
- ✔️ OpenAI (para IA)  
- ✔️ Google Cloud (para OCR ou outros serviços)  
- ✔️ Fish.audio (para voz realista, opcional)  

---

## 🧠 **Instalação e Setup**

### 🚥 1. Clone o projeto

```bash
git clone https://github.com/danilo-programadorr/FitnessServer.git
cd fitnessServer
```

### 📦 2. Instale as dependências do backend

```bash
cd server
npm install
```

Ou, se usa **yarn**:

```bash
yarn install
```

### 🎯 3. Configure as variáveis de ambiente

Crie um arquivo chamado **`.env.local`** na raiz do projeto (`/fitnessServer`) com este exemplo:

```env
# Supabase
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_KEY=your_supabase_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Google Cloud
GOOGLE_API_KEY=your_google_api_key

# Fish.audio
FISH_AUDIO_API_KEY=your_fish_audio_api_key

# App Config
PORT=5000
FRONTEND_URL=http://localhost:5173
```

---

## 🚀 **Rodando o Projeto**

### 🔥 Startar o Backend:

```bash
npm run dev
```

Ou:

```bash
yarn dev
```

> Isso inicia o servidor em `http://localhost:5000`.

---

## 🛠️ **Scripts Disponíveis**

| Comando           | Descrição                           |
|-------------------|-------------------------------------|
| `npm run dev`     | Executa o servidor em modo dev (nodemon) |
| `npm run start`   | Executa em modo produção           |
| `npm install`     | Instala as dependências            |

---

## 🌐 **Rotas Principais da API**

| Método | Rota                | Descrição                      |
|--------|----------------------|--------------------------------|
| GET    | `/api/health`        | Verifica se a API está online |
| POST   | `/api/auth/login`    | Login via Supabase            |
| POST   | `/api/auth/register` | Registro via Supabase         |
| GET    | `/api/user/profile`  | Retorna dados do usuário      |
| POST   | `/api/payment/create-session` | Cria sessão Stripe  |
| POST   | `/api/ai/chat`       | Envia mensagem para OpenAI    |

> ⚙️ Outras rotas específicas estão na pasta `/routes`.

---

## 📷 **Imagens e Demonstrações**

> 🧠 API Rodando Localmente:

![API Running](https://i.imgur.com/2uWfLPv.png)

> 🌍 Dashboard do Supabase (Exemplo):

![Supabase](https://i.imgur.com/da3zTrN.png)

> 💳 Stripe Checkout (Exemplo):

![Stripe](https://i.imgur.com/Mi64N4A.png)

---

## ⚠️ **Atenção com Segurança**

❗️ Coloque no `.gitignore`:

```gitignore
.env
.env.local
certs/
*.pem
```

> 🔥 **Nunca suba suas chaves privadas, arquivos `.pem` ou `.env` para o repositório remoto!**  
O GitGuardian te alertou corretamente. Se isso acontecer, gere uma nova chave na plataforma comprometida.

---

## 💡 **Dicas Extras**

- ✔️ Use ferramentas como **[dotenv](https://www.npmjs.com/package/dotenv)** para carregar variáveis.
- ✔️ Use **[cors](https://www.npmjs.com/package/cors)** para permitir chamadas do frontend.
- ✔️ Utilize **rate limit** para segurança da API.
- ✔️ Se quiser rodar com HTTPS localmente, use arquivos `.pem` na pasta `/server/certs`.

---

## 🤝 **Contribuição**

Quer contribuir? Faça um fork, crie sua branch (`git checkout -b feature-nome`), commit (`git commit -m 'feature'`) e abra um Pull Request!

---

## 🧠 **Tecnologias Usadas**

- 🟩 Node.js
- ⚙️ Express
- 🛠️ Supabase
- 💳 Stripe
- 🧠 OpenAI
- 🔍 Google Cloud (OCR)
- 🔊 Fish.audio
- 🔒 JWT + Middlewares

---
## 🧪 Testes

> Em breve! Sinta-se à vontade para contribuir com testes automatizados usando Jest, Mocha, ou sua lib favorita.


## 🚀 **Autor**

> Feito com ❤️ por **[@danilo-programadorr](https://github.com/seuGithub)**

