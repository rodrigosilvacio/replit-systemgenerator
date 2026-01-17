import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ProjectCard } from "./ProjectCard";
import { CodePreview } from "./CodePreview";
import { Button } from "@/components/ui/button";
import { X, FolderOpen } from "lucide-react";
import type { Project } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProjectListProps {
  projects: Project[];
  isLoading: boolean;
  onDelete: (id: number) => void;
}

export function ProjectList({ projects, isLoading, onDelete }: ProjectListProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <div className="animate-pulse space-y-3">
              <div className="flex justify-between">
                <div className="h-5 w-1/3 bg-muted rounded" />
                <div className="h-5 w-16 bg-muted rounded" />
              </div>
              <div className="h-4 w-2/3 bg-muted rounded" />
              <div className="flex gap-2">
                <div className="h-8 flex-1 bg-muted rounded" />
                <div className="h-8 w-10 bg-muted rounded" />
                <div className="h-8 w-10 bg-muted rounded" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <Card className="p-8 text-center">
        <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
        <h3 className="font-medium text-lg mb-1">Nenhum projeto ainda</h3>
        <p className="text-sm text-muted-foreground">
          Crie seu primeiro sistema usando o gerador acima
        </p>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onView={setSelectedProject}
            onDelete={onDelete}
          />
        ))}
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle className="flex items-center gap-2">
              <span>{selectedProject?.name}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="px-6 pb-6">
            {selectedProject && <CodePreview project={selectedProject} />}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
