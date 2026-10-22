# System Generator

Aplicação web para geração automática de código usando Inteligência Artificial. O usuário descreve o sistema desejado, seleciona uma linguagem de programação e a IA gera o código completo e funcional.

## Funcionalidades

- **Geração de código por IA**: Utiliza GPT-4o para criar código completo baseado em descrições textuais
- **Suporte a 15 linguagens**: Node.js, Python, TypeScript, JavaScript, React, HTML/CSS, Java, C++, C#, Go, Rust, Ruby, PHP, Swift e Kotlin
- **Interface em português**: Toda a interface do usuário está em português brasileiro
- **Tema claro/escuro**: Alternância entre modos de exibição
- **Histórico de projetos**: Lista de projetos gerados com opção de visualizar código e excluir
- **Visualização de código**: Modal com destaque de sintaxe e botão para copiar
- **Execução no navegador**: Código HTML, JavaScript e React pode ser executado diretamente em nova janela

## Stack Tecnológica

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Radix UI (componentes de interface)
- TanStack React Query
- Wouter (roteamento)
- Framer Motion (animações)

### Backend
- Node.js
- Express 5
- TypeScript
- OpenAI SDK
- Drizzle ORM
- Zod (validação)

## Estrutura de Pastas

```
├── client/                  # Aplicação frontend
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   │   ├── ui/          # Componentes base (shadcn/ui)
│   │   │   ├── CodePreview.tsx
│   │   │   ├── GeneratingAnimation.tsx
│   │   │   ├── LanguageSelector.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectList.tsx
│   │   │   ├── PromptInput.tsx
│   │   │   ├── ThemeProvider.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── hooks/           # React hooks customizados
│   │   ├── lib/             # Utilitários e configurações
│   │   ├── pages/           # Páginas da aplicação
│   │   │   └── Home.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── index.html
├── server/                  # API backend
│   ├── index.ts             # Ponto de entrada do servidor
│   ├── routes.ts            # Endpoints da API
│   ├── storage.ts           # Armazenamento em memória
│   ├── static.ts            # Servir arquivos estáticos
│   └── vite.ts              # Configuração Vite para desenvolvimento
├── shared/                  # Código compartilhado
│   └── schema.ts            # Schemas e tipos (Drizzle/Zod)
└── script/
    └── build.ts             # Script de build
```

## Instalação

```bash
npm install
```

## Execução

### Modo de desenvolvimento

```bash
npm run dev
```

O servidor será iniciado na porta 5000.

### Build de produção

```bash
npm run build
```

### Executar em produção

```bash
npm start
```

### Verificação de tipos

```bash
npm run check
```

### Sincronizar schema do banco de dados

```bash
npm run db:push
```

## Variáveis de Ambiente

- `AI_INTEGRATIONS_OPENAI_API_KEY` - Chave de API do OpenAI
- `AI_INTEGRATIONS_OPENAI_BASE_URL` - URL base da API OpenAI
- `DATABASE_URL` - URL de conexão PostgreSQL (necessária para `db:push`)
- `PORT` - Porta do servidor (padrão: 5000)
- `NODE_ENV` - Ambiente de execução (`development` ou `production`)

## API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/projects` | Lista todos os projetos |
| GET | `/api/projects/:id` | Retorna um projeto específico |
| POST | `/api/projects/generate` | Gera um novo projeto com IA |
| DELETE | `/api/projects/:id` | Remove um projeto |

## Observações

- Os projetos são armazenados em memória e são perdidos ao reiniciar o servidor
- A geração de código requer configuração das variáveis de ambiente da API OpenAI
