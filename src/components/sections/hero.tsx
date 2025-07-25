"use client";

import { Button } from "@/components/ui/button";
import { FolderGit2, Wrench } from "lucide-react";
import { motion } from "motion/react";
import { trackNavigation, trackResumeDownload } from "@/lib/analytics";
import {
  usePersonalInfo,
  usePortfolioStore,
} from "../../stores/portfolio-store";

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

export function Hero() {
  const personalInfo = usePersonalInfo();
  const resume = usePortfolioStore(state => state.resume);

  return (
    <section
      id="home"
      className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.h1
          className="text-4xl sm:text-6xl font-bold text-foreground mb-2"
          {...fadeIn}
        >
          {personalInfo.name}
        </motion.h1>
        <motion.h2
          className="text-xl sm:text-2xl font-semibold text-primary mb-6 tracking-widest uppercase"
          {...slideUp}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {personalInfo.role}
        </motion.h2>
        <motion.p
          className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          {...slideUp}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {personalInfo.bio}
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
            onClick={() => {
              trackNavigation("projects");
              document.getElementById("projects")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            <FolderGit2 className="w-5 h-5" />
            View Portfolio
          </Button>
          {resume.fileName && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                trackResumeDownload();
                // Download the resume file from public directory
                window.open(`/${resume.fileName}`, "_blank");
              }}
            >
              <Wrench className="w-5 h-5" />
              Download Resume
            </Button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
