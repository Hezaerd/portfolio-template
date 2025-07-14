"use client";

import { skills } from "@/data/skills";
import { User, Wrench } from "lucide-react";
import { motion } from "motion/react";

export function About() {
  return (
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
              I'm a game and engine programmer with a strong background in C++,
              C#, and real-time graphics. I enjoy building custom engines,
              gameplay systems, and development tools that empower creators and
              players alike.
            </p>
            <p className="text-lg text-muted-foreground">
              My experience spans engine architecture, physics, rendering, and
              cross-platform development. I thrive on solving complex technical
              challenges and collaborating with multidisciplinary teams.
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
  );
}
