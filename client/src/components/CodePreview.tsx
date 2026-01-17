import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, ExternalLink, Code2, FileCode } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Project } from "@shared/schema";

interface CodePreviewProps {
  project: Project;
}

export function CodePreview({ project }: CodePreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(project.generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeLines = project.generatedCode.split("\n");

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-4 py-3 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          <FileCode className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm">{project.name}</span>
          <span className="text-xs text-muted-foreground px-2 py-0.5 rounded bg-muted">
            {project.language}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="gap-1.5"
            data-testid="button-copy-code"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copiado
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copiar
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => window.open(project.url, "_blank")}
            data-testid="button-open-url"
          >
            <ExternalLink className="h-4 w-4" />
            Abrir
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[400px]">
        <div className="relative">
          <div className="flex">
            <div className="flex-shrink-0 py-4 pl-4 pr-2 text-right text-xs font-mono text-muted-foreground select-none bg-muted/20 border-r">
              {codeLines.map((_, i) => (
                <div key={i} className="leading-6">
                  {i + 1}
                </div>
              ))}
            </div>
            <pre className="flex-1 p-4 overflow-x-auto">
              <code className="text-sm font-mono leading-6 block">
                {codeLines.map((line, i) => (
                  <div key={i} className="whitespace-pre">
                    {line || " "}
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
}
