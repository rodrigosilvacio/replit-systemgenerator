# System Generator - AI-Powered Code Generation

## Overview
System Generator is an AI-powered application that generates complete code systems based on user prompts. Users can select from 15 supported programming languages and describe the system they want to create. The AI generates functional, well-commented code.

## Current State
- **MVP Complete**: Core functionality working
- **AI Integration**: Using OpenAI GPT-4o via Replit AI Integrations
- **Storage**: In-memory (not persistent across restarts)

## Project Architecture

### Frontend (React + TypeScript)
```
client/src/
├── components/
│   ├── CodePreview.tsx      # Code viewer with syntax highlighting
│   ├── GeneratingAnimation.tsx  # Loading animation
│   ├── LanguageSelector.tsx # 15 language options
│   ├── ProjectCard.tsx      # Individual project display
│   ├── ProjectList.tsx      # List of generated projects
│   ├── PromptInput.tsx      # Text input with suggestions
│   ├── ThemeProvider.tsx    # Dark/light mode context
│   └── ThemeToggle.tsx      # Theme switch button
├── pages/
│   └── Home.tsx             # Main page
└── App.tsx                  # Root component with routing
```

### Backend (Express + TypeScript)
```
server/
├── routes.ts               # API endpoints
├── storage.ts              # In-memory project storage
└── index.ts                # Server entry point
```

### Shared
```
shared/
└── schema.ts               # Data models and types
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/projects | List all projects |
| GET | /api/projects/:id | Get single project |
| POST | /api/projects/generate | Generate new project |
| DELETE | /api/projects/:id | Delete project |

## Supported Languages
- Node.js, Python, TypeScript, JavaScript, React
- HTML/CSS, Java, C++, C#, Go
- Rust, Ruby, PHP, Swift, Kotlin

## Key Features
1. **Language Selection**: Visual grid with icons for each language
2. **Prompt Input**: Textarea with suggestion buttons
3. **AI Generation**: Uses GPT-4o to generate complete code
4. **Code Preview**: Modal with line numbers and copy button
5. **Project History**: List of recent projects with status
6. **Dark Mode**: Full dark/light theme support

## Technical Notes
- OpenAI integration via Replit AI Integrations (no API key needed)
- Environment variables: AI_INTEGRATIONS_OPENAI_API_KEY, AI_INTEGRATIONS_OPENAI_BASE_URL
- Projects stored in memory (reset on server restart)
- Portuguese interface with Brazilian locale

## Running the Application
```bash
npm run dev
```
Server runs on port 5000.
