# Finance Track

Finance Track é um aplicativo web de controle financeiro pessoal que permite ao usuário visualizar saldo, receitas e despesas em um dashboard com gráficos por categoria, adicionar/remover transações, e gerenciar seu perfil — com páginas de login e cadastro preparadas para futura autenticação.

## Instalação

1. Clone o repositório e acesse a pasta do projeto:

```bash
git clone https://github.com/lucasterencio/FinanceTrack.git
cd finance-track
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto com as credenciais do seu projeto Firebase:

```env
VITE_API_KEY=SUA_API_KEY
VITE_AUTH_DOMAIN=SEU_AUTH_DOMAIN
VITE_PROJECTID=SEU_PROJECT_ID
VITE_STORAGE_BUCKET=SEU_STORAGE_BUCKET
VITE_MESSAGING_SENDERID=SEU_SENDER_ID
VITE_APP_ID=SEU_APP_ID
```

Essas valores podem ser encontrados em **Firebase Console → Configurações do projeto → Seus apps → Configuração do SDK**.

4. Execute o projeto em desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

## Funcionalidades

- **Dashboard financeiro**: cards com saldo total, receitas e despesas atualizados em tempo real.
- **Gráfico por categoria**: visualização das despesas/receitas por categoria em gráfico de rosca.
- **Transações**: adicionar novas transações (receita ou despesa) com descrição, categoria e valor; remover transações existentes.
- **Autenticação**: páginas de login e cadastro com validação de formulários (rotas protegidas prontas para integração com autenticação).
- **Gerenciamento de perfil**: editar dados do usuário e excluir conta.
- **Formatação em BRL**: valores exibidos no padrão monetário brasileiro.

## Tecnologias

- [React](https://react.dev) 19 + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev) — build e dev server
- [Tailwind CSS](https://tailwindcss.com) 4 + [shadcn/ui](https://ui.shadcn.com)
- [Firebase](https://firebase.google.com) — Auth e Firestore
- [React Router](https://reactrouter.com) 7 — navegação e rotas protegidas
- [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) — formulários e validação
- [Recharts](https://recharts.org) — gráficos
- [react-hot-toast](https://react-hot-toast.com) — notificações

## Pré-requisitos

- Node.js (versão 18 ou superior)
- Um projeto no [Firebase](https://console.firebase.google.com) com **Authentication** e **Firestore** (em modo de teste ou com regras de segurança) habilitados.



## Scripts disponíveis

| Comando            | Descrição                                  |
| ------------------ | ------------------------------------------ |
| `npm run dev`      | Inicia o servidor de desenvolvimento (Vite) |
| `npm run build`    | Gera a versão de produção                  |
| `npm run preview`  | Previsualiza a build de produção           |
| `npm run lint`     | Executa o ESLint no projeto                |

## Deploy

O projeto inclui um arquivo `vercel.json` com rewrites para o React Router, pronto para deploy na [Vercel](https://vercel.com). Faça o push para o GitHub e importe o repositório na Vercel, ou execute:

```bash
vercel
```

Lembre-se de configurar as variáveis de ambiente (`VITE_*`) também no ambiente de produção.
