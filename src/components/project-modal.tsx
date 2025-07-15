"use client";

import { Project } from "@/data/projects";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Github,
  ExternalLink,
  Clock,
  Users,
  User,
  CheckCircle,
  AlertTriangle,
  Wrench,
} from "lucide-react";
import { useEffect } from "react";
import { trackProjectModalOpen, trackProjectLink } from "@/lib/analytics";

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Track modal opening
  useEffect(() => {
    if (isOpen) {
      trackProjectModalOpen(project.title);
    }
  }, [isOpen, project.title]);

  // Handler for GitHub link
  const handleGithubClick = () => {
    trackProjectLink(project.title, "github");
    if (project.githubUrl) {
      window.open(project.githubUrl, "_blank");
    }
  };

  // Handler for live demo link
  const handleLiveClick = () => {
    trackProjectLink(project.title, "live");
    if (project.liveUrl) {
      window.open(project.liveUrl, "_blank");
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Wrench className="w-6 h-6 text-primary" />
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-base">
            {project.longDescription || project.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.duration && (
              <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                <Clock className="w-4 h-4 text-primary" />
                <div>
                  <div className="text-sm font-medium">Duration</div>
                  <div className="text-sm text-muted-foreground">
                    {project.duration}
                  </div>
                </div>
              </div>
            )}
            {project.teamSize && (
              <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                <Users className="w-4 h-4 text-primary" />
                <div>
                  <div className="text-sm font-medium">Team Size</div>
                  <div className="text-sm text-muted-foreground">
                    {project.teamSize}
                  </div>
                </div>
              </div>
            )}
            {project.role && (
              <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                <User className="w-4 h-4 text-primary" />
                <div>
                  <div className="text-sm font-medium">My Role</div>
                  <div className="text-sm text-muted-foreground">
                    {project.role}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {(project.githubUrl || project.liveUrl) && (
            <div className="flex gap-3">
              {project.githubUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={handleGithubClick}
                >
                  <Github className="w-4 h-4" />
                  View Code
                </Button>
              )}
              {project.liveUrl && (
                <Button
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={handleLiveClick}
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </Button>
              )}
            </div>
          )}

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-primary" />
                Technologies & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Key Features
              </h3>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                Technical Challenges & Solutions
              </h3>
              <ul className="space-y-2">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
