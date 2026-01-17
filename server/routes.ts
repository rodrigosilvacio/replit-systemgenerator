import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";
import { z } from "zod";
import { SUPPORTED_LANGUAGES } from "@shared/schema";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const generateProjectSchema = z.object({
  prompt: z.string().min(1, "Prompt é obrigatório"),
  language: z.string().min(1, "Linguagem é obrigatória"),
});

function generateProjectName(prompt: string): string {
  const words = prompt.split(/\s+/).slice(0, 3);
  const name = words.join("-").toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-]/g, "");
  return name || "projeto";
}

function generateUrl(name: string, id: number): string {
  return `https://${name}-${id}.replit.app`;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Falha ao buscar projetos" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ error: "Projeto não encontrado" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ error: "Falha ao buscar projeto" });
    }
  });

  app.post("/api/projects/generate", async (req, res) => {
    let projectId: number | null = null;
    
    try {
      const validation = generateProjectSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: validation.error.errors[0]?.message || "Dados inválidos" 
        });
      }

      const { prompt, language } = validation.data;
      const languageInfo = SUPPORTED_LANGUAGES.find(l => l.id === language);
      
      if (!languageInfo) {
        return res.status(400).json({ error: "Linguagem não suportada" });
      }

      const projectName = generateProjectName(prompt);
      
      const initialProject = await storage.createProject({
        name: projectName,
        prompt,
        language: languageInfo.name,
        generatedCode: "",
        url: "",
        status: "generating",
      });
      
      projectId = initialProject.id;

      const systemPrompt = `Você é um gerador de código especializado em ${languageInfo.name}. 
Gere código limpo, bem comentado e funcional baseado na descrição do usuário.
Retorne APENAS o código, sem explicações antes ou depois.
Use boas práticas de programação e inclua comentários explicativos.
O código deve ser completo e pronto para execução.`;

      const userPrompt = `Crie uma aplicação em ${languageInfo.name} com a seguinte descrição:

${prompt}

Gere o código completo e funcional.`;

      console.log(`[Generate] Starting code generation for project ${projectId}`);

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 4096,
      });

      const generatedCode = completion.choices[0]?.message?.content;
      
      if (!generatedCode || generatedCode.trim().length === 0) {
        console.error(`[Generate] Empty response from AI for project ${projectId}`);
        await storage.updateProject(projectId, {
          status: "error",
          generatedCode: "// A IA não retornou código. Tente novamente com uma descrição mais detalhada.",
        });
        return res.status(500).json({ error: "A IA não conseguiu gerar o código. Tente uma descrição diferente." });
      }

      const url = generateUrl(projectName, projectId);

      const updatedProject = await storage.updateProject(projectId, {
        generatedCode,
        url,
        status: "completed",
      });

      console.log(`[Generate] Successfully generated code for project ${projectId}`);
      res.json(updatedProject);
    } catch (error) {
      console.error("Error generating project:", error);
      
      if (projectId) {
        await storage.updateProject(projectId, {
          status: "error",
          generatedCode: "// Erro durante a geração. Tente novamente.",
        });
      }
      
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      res.status(500).json({ error: `Falha ao gerar projeto: ${errorMessage}` });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteProject(id);
      if (!success) {
        return res.status(404).json({ error: "Projeto não encontrado" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ error: "Falha ao excluir projeto" });
    }
  });

  return httpServer;
}
