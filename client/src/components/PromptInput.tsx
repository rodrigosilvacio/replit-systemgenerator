import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2 } from "lucide-react";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  disabled: boolean;
}

const PROMPT_SUGGESTIONS = [
  "Um sistema de tarefas com lista e status",
  "Uma calculadora com interface moderna",
  "Um jogo da velha multiplayer",
  "Um blog simples com posts",
  "Uma API REST para gerenciar produtos",
];

export function PromptInput({
  value,
  onChange,
  onSubmit,
  isLoading,
  disabled,
}: PromptInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && !disabled) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Descreva o sistema que você quer criar
        </label>
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ex: Crie um sistema de gerenciamento de tarefas com autenticação, lista de tarefas com status, e dashboard..."
          className="min-h-[140px] resize-none text-base"
          data-testid="input-prompt"
        />
        <p className="text-xs text-muted-foreground">
          Dica: Seja específico sobre funcionalidades, design e comportamentos desejados.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {PROMPT_SUGGESTIONS.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onChange(suggestion)}
            className="px-3 py-1.5 text-xs rounded-md border border-border bg-muted/50 text-muted-foreground hover-elevate active-elevate-2 transition-colors"
            data-testid={`button-suggestion-${index}`}
          >
            {suggestion}
          </button>
        ))}
      </div>

      <Button
        onClick={onSubmit}
        disabled={disabled || isLoading}
        className="w-full gap-2"
        size="lg"
        data-testid="button-generate"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Gerando Sistema...
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            Gerar Sistema
          </>
        )}
      </Button>
    </div>
  );
}
