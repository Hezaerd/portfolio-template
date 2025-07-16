"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { trackThemeChange } from "@/lib/analytics";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="w-9 h-9 transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
      >
        <div className="w-4 h-4" />
      </Button>
    );
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    trackThemeChange(newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-9 h-9 transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-105"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          className="flex items-center justify-center"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-amber-500" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          )}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
}
