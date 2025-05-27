# AGTV - Streaming Platform

Plataforma de streaming com assinatura mensal e anual, integrada com o Stripe para processamento de pagamentos.

## 🚀 Tecnologias Utilizadas

- React.js
- Node.js
- Express.js
- Stripe API
- Tailwind CSS
- React Icons
- The Movie Database (TMDB) API
- Google AI Studio (Gemini)

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- NPM ou Yarn
- Conta no Stripe
- Conta no TMDB
- Conta no Google AI Studio (opcional)

## 🔧 Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/agilsonaraujoo/agtv-streaming.git
cd agtv-streaming
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Frontend
REACT_APP_TMDB_API_KEY=sua_chave_tmdb
REACT_APP_GEMINI_API_KEY=sua_chave_gemini

# Backend
STRIPE_SECRET_KEY=sua_chave_secreta_stripe
STRIPE_PUBLIC_KEY=sua_chave_publica_stripe
WEBHOOK_SECRET=sua_chave_webhook_stripe

# IDs dos preços no Stripe
STRIPE_PRICE_ID_SEMESTRAL=id_do_preco_semestral
STRIPE_PRICE_ID_ANUAL=id_do_preco_anual

# URLs de retorno
STRIPE_SUCCESS_URL=http://localhost:3000/success
STRIPE_CANCEL_URL=http://localhost:3000/cancel

# Porta do servidor
PORT=5000
```

### 3. Instale as dependências

#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd backend
npm install
```

### 4. Configure o Stripe

1. Crie uma conta no Stripe (https://stripe.com)
2. Acesse o Dashboard do Stripe e:
   - Crie dois produtos:
     - Plano Semestral
     - Plano Anual
   - Para cada produto, crie um preço:
     - Para o plano semestral: Preço fixo por 6 meses
     - Para o plano anual: Preço fixo por 12 meses
   - Copie os IDs dos preços e adicione no `.env` como:
     ```env
     STRIPE_PRICE_ID_SEMESTRAL=id_do_preco_semestral
     STRIPE_PRICE_ID_ANUAL=id_do_preco_anual
     ```
3. Adicione as chaves do Stripe no arquivo `.env`:
   ```env
   STRIPE_SECRET_KEY=sua_chave_secreta
   STRIPE_PUBLIC_KEY=sua_chave_publica
   WEBHOOK_SECRET=sua_chave_webhook
   ```

### 5. Configure o TMDB

1. Crie uma conta no TMDB (https://www.themoviedb.org)
2. Solicite uma API Key
3. Adicione a chave no `.env` como `REACT_APP_TMDB_API_KEY`

### 6. Configure o Google AI Studio (opcional)

1. Crie uma conta no Google Cloud Platform
2. Habilite o Gemini API
3. Crie uma chave de API
4. Adicione a chave no `.env` como `REACT_APP_GEMINI_API_KEY`

## 🏃‍♂️ Executando o Projeto

### Frontend
```bash
cd frontend
npm start
```

### Backend
```bash
cd backend
npm start
```

## 📱 Estrutura do Projeto

```
agtv-streaming/
├── backend/           # API Node.js com Express
│   ├── server.js      # Configuração do servidor
│   └── package.json   # Dependências do backend
├── frontend/          # Aplicação React
│   ├── src/          # Código fonte
│   │   ├── components/ # Componentes React
│   │   ├── pages/     # Páginas da aplicação
│   │   └── data/      # Dados estáticos
│   ├── public/        # Arquivos públicos
│   └── package.json   # Dependências do frontend
└── README.md         # Documentação do projeto
```

## 🛠️ Funcionalidades

- Sistema de assinatura com Stripe
- Catálogo de filmes integrado com TMDB
- Recomendações personalizadas com AI (Gemini)
- Interface responsiva com Tailwind CSS
- Sistema de FAQ
- Página de sucesso/cancelamento do pagamento
- Portal do cliente para gerenciar assinatura

## 📝 Observações

- O arquivo `.env.example` contém um exemplo das variáveis necessárias
- Nunca compartilhe suas chaves de API
- O projeto usa HTTPS para comunicação com o Stripe
- Mantenha o backend em uma porta diferente do frontend

## 📄 Licença

Este projeto é de uso privado e não deve ser distribuído sem autorização.
