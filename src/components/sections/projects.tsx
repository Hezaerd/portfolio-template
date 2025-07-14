"use client";

import { projects } from "@/data/projects";
import { ProjectModal } from "@/components/project-modal";
import { FolderGit2, User, Mail, Wrench } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <FolderGit2 className="w-7 h-7 text-primary" /> Featured Projects
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="bg-card rounded-lg shadow-lg overflow-hidden border border-border cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedProject(project)}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="h-48 bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold"
                animate={{
                  scale: hoveredCard === index ? 1.05 : 1,
                  filter:
                    hoveredCard === index ? "brightness(0.9)" : "brightness(1)",
                }}
                transition={{ duration: 0.2 }}
              >
                {project.highlight || project.title}
              </motion.div>
              <div className="p-6">
                <motion.h3
                  className="text-xl font-semibold text-card-foreground mb-2 flex items-center gap-2"
                  animate={{
                    color:
                      hoveredCard === index
                        ? "hsl(var(--primary))"
                        : "hsl(var(--card-foreground))",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <FolderGit2 className="w-5 h-5 text-primary" />{" "}
                  {project.title}
                </motion.h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex gap-2 flex-wrap mb-3">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full flex items-center gap-1"
                    >
                      {tag === "C++" && (
                        <Wrench className="w-3 h-3 text-primary" />
                      )}
                      {tag === "Unity" && (
                        <User className="w-3 h-3 text-primary" />
                      )}
                      {tag === "AI" && (
                        <Mail className="w-3 h-3 text-primary" />
                      )}
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-primary font-medium relative inline-block">
                  <span>Click to view details →</span>
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-primary w-full"
                    animate={{
                      scaleX: hoveredCard === index ? 1 : 0,
                    }}
                    style={{ originX: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
