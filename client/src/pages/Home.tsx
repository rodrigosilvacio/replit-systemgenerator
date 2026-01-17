import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { LanguageSelector } from "@/components/LanguageSelector";
import { PromptInput } from "@/components/PromptInput";
import { ProjectList } from "@/components/ProjectList";
import { GeneratingAnimation } from "@/components/GeneratingAnimation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Layers, Sparkles, History } from "lucide-react";
import type { Project, SupportedLanguage } from "@shared/schema";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const generateMutation = useMutation({
    mutationFn: async (data: { prompt: string; language: string }) => {
      const response = await apiRequest("POST", "/api/projects/generate", data);
      return response.json();
    },
    onMutate: () => {
      setIsGenerating(true);
    },
    onSuccess: (newProject) => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Sistema gerado com sucesso!",
        description: `${newProject.name} foi criado e está pronto para uso.`,
      });
      setPrompt("");
      setSelectedLanguage(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao gerar sistema",
        description: error.message || "Ocorreu um erro. Tente novamente.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsGenerating(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Projeto removido",
        description: "O projeto foi excluído com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível remover o projeto.",
        variant: "destructive",
      });
    },
  });

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt vazio",
        description: "Por favor, descreva o sistema que você deseja criar.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedLanguage) {
      toast({
        title: "Linguagem não selecionada",
        description: "Por favor, selecione uma linguagem de programação.",
        variant: "destructive",
      });
      return;
    }

    generateMutation.mutate({
      prompt: prompt.trim(),
      language: selectedLanguage.id,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
              <Layers className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">System Generator</h1>
              <p className="text-xs text-muted-foreground">Powered by AI</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container px-4 py-8 mx-auto">
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="font-semibold text-xl">Criar Novo Sistema</h2>
              </div>
              <p className="text-muted-foreground">
                Descreva a aplicação que você deseja e nossa IA irá gerar o código completo.
              </p>
            </div>

            <Card className="p-6">
              {isGenerating ? (
                <GeneratingAnimation />
              ) : (
                <div className="space-y-6">
                  <LanguageSelector
                    selectedLanguage={selectedLanguage?.id || null}
                    onSelect={setSelectedLanguage}
                  />
                  <PromptInput
                    value={prompt}
                    onChange={setPrompt}
                    onSubmit={handleGenerate}
                    isLoading={generateMutation.isPending}
                    disabled={!selectedLanguage}
                  />
                </div>
              )}
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <History className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-semibold text-lg">Projetos Recentes</h2>
              {projects.length > 0 && (
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {projects.length}
                </span>
              )}
            </div>
            <ProjectList
              projects={projects}
              isLoading={projectsLoading}
              onDelete={(id) => deleteMutation.mutate(id)}
            />
          </div>
        </div>
      </main>

      <footer className="border-t py-6 mt-12">
        <div className="container px-4 mx-auto text-center text-sm text-muted-foreground">
          <p>System Generator - Crie aplicações com IA</p>
        </div>
      </footer>
    </div>
  );
}
