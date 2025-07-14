"use client";

import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, ExternalLink, Mail } from "lucide-react";
import { motion } from "motion/react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright and Credits */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground mb-2">
              © {new Date().getFullYear()} Your Name. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-start gap-1">
              Portfolio crafted by{" "}
              <a
                href="https://hezaerd.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors duration-200 flex items-center gap-1 font-medium"
              >
                Hezaerd
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </motion.div>

          {/* Social Media Icons */}
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                window.open("https://github.com/yourusername", "_blank")
              }
              className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                window.open("https://linkedin.com/in/yourusername", "_blank")
              }
              className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            >
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                window.open("https://twitter.com/yourusername", "_blank")
              }
              className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            >
              <Twitter className="w-5 h-5" />
              <span className="sr-only">Twitter</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                window.open("mailto:your.email@example.com", "_blank")
              }
              className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            >
              <Mail className="w-5 h-5" />
              <span className="sr-only">Email</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
