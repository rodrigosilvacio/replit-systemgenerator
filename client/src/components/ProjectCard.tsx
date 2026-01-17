import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Code2, Clock, Trash2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ProjectCardProps {
  project: Project;
  onView: (project: Project) => void;
  onDelete: (id: number) => void;
  onRun: (project: Project) => void;
}

export function ProjectCard({ project, onView, onDelete, onRun }: ProjectCardProps) {
  const statusColors: Record<string, string> = {
    generating: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    completed: "bg-green-500/10 text-green-600 dark:text-green-400",
    error: "bg-red-500/10 text-red-600 dark:text-red-400",
  };

  const statusLabels: Record<string, string> = {
    generating: "Gerando",
    completed: "Concluído",
    error: "Erro",
  };

  return (
    <Card className="p-4 hover-elevate transition-all">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base truncate">{project.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {project.prompt}
            </p>
          </div>
          <Badge
            variant="secondary"
            className={cn("shrink-0", statusColors[project.status])}
          >
            {statusLabels[project.status] || project.status}
          </Badge>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Code2 className="h-3.5 w-3.5" />
            <span>{project.language}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>
              {formatDistanceToNow(new Date(project.createdAt), {
                addSuffix: true,
                locale: ptBR,
              })}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <Button
            variant="default"
            size="sm"
            className="flex-1 gap-1.5"
            onClick={() => onView(project)}
            data-testid={`button-view-project-${project.id}`}
          >
            <Eye className="h-4 w-4" />
            Ver Código
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => onRun(project)}
            disabled={project.status !== "completed"}
            data-testid={`button-run-project-${project.id}`}
          >
            <Play className="h-4 w-4" />
            Executar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(project.id)}
            className="text-muted-foreground hover:text-destructive"
            data-testid={`button-delete-project-${project.id}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
