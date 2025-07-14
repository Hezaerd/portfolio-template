"use client";

import { projects } from "@/data/projects";
import { FolderGit2, User, Mail, Wrench } from "lucide-react";
import { motion } from "motion/react";

export function Projects() {
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
              className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200 border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-48 bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                {project.highlight || project.title}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-2 flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-primary" />{" "}
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex gap-2 flex-wrap">
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
