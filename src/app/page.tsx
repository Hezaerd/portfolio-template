"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import { workExperience, education } from "@/data/experience";
import {
  User,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Mail,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";

// Lightweight animation variants
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
};

const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-4xl sm:text-6xl font-bold text-foreground mb-2"
            {...fadeIn}
          >
            Angel Gimer
          </motion.h1>
          <motion.h2
            className="text-xl sm:text-2xl font-semibold text-primary mb-6 tracking-widest uppercase"
            {...slideUp}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Game/Engine Programmer
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            {...slideUp}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Passionate about building high-performance game engines, tools, and
            interactive experiences. Specialized in C++, C#, and real-time
            graphics.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            {...slideUp}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Button
              variant="default"
              size="lg"
              className="hover:bg-primary/70 hover:shadow-lg transition-all duration-200"
            >
              <FolderGit2 className="w-5 h-5" />
              View Portfolio
            </Button>
            <Button variant="outline" size="lg">
              <Wrench className="w-5 h-5" />
              Download Resume
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center text-card-foreground mb-12 flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <User className="w-7 h-7 text-primary" /> About Me
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-muted-foreground mb-6">
                I'm a game and engine programmer with a strong background in
                C++, C#, and real-time graphics. I enjoy building custom
                engines, gameplay systems, and development tools that empower
                creators and players alike.
              </p>
              <p className="text-lg text-muted-foreground">
                My experience spans engine architecture, physics, rendering, and
                cross-platform development. I thrive on solving complex
                technical challenges and collaborating with multidisciplinary
                teams.
              </p>
            </motion.div>
            <motion.div
              className="bg-primary p-1 rounded-lg"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-background p-8 rounded-lg">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-primary" /> Skills &
                  Technologies
                </h3>
                <motion.div
                  className="grid grid-cols-2 gap-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  {skills.map(skill => (
                    <div
                      key={skill}
                      className="text-muted-foreground flex items-center gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                      {skill}
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
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

      {/* Resume Section */}
      <section id="resume" className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center text-card-foreground mb-12 flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Briefcase className="w-7 h-7 text-primary" /> Experience &
            Education
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-card-foreground mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" /> Work Experience
              </h3>
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                {workExperience.map(exp => (
                  <div
                    key={exp.title}
                    className={`border-l-4 border-${exp.color} pl-6`}
                  >
                    <h4 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" /> {exp.title}
                    </h4>
                    <p className={`text-${exp.color}`}>
                      {exp.company} • {exp.period}
                    </p>
                    <p className="text-muted-foreground mt-2">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-card-foreground mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" /> Education
              </h3>
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                {education.map(edu => (
                  <div
                    key={edu.degree}
                    className="border-l-4 border-secondary pl-6"
                  >
                    <h4 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-primary" />{" "}
                      {edu.degree}
                    </h4>
                    <p className="text-secondary-foreground">
                      {edu.school} • {edu.period}
                    </p>
                    <p className="text-muted-foreground mt-2">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-foreground mb-8 flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Mail className="w-7 h-7 text-primary" /> Let's Work Together
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            I'm always interested in new opportunities and exciting projects.
            Feel free to reach out if you'd like to collaborate!
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button
              variant="default"
              size="lg"
              className="hover:bg-primary/70 hover:shadow-lg transition-all duration-200"
            >
              <Mail className="w-5 h-5" />
              Send Message
            </Button>
            <Button variant="outline" size="lg">
              <User className="w-5 h-5" />
              Schedule Call
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
