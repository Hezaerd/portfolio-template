"use client";

import { useOnboardingContext } from "@/contexts/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit3, Download, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { createDownloadLinks } from "@/lib/fileGenerator";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const EditOnboarding = () => {
  const {
    isCompleted,
    resetOnboarding,
    onboardingData,
    isDataCustomized,
    setIsOnboardingOpen,
    currentStep,
    setCurrentStep,
  } = useOnboardingContext();
  const [generatedFiles, setGeneratedFiles] = useState<any[]>([]);
  const [savedStep, setSavedStep] = useState<number | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isDev = process.env.NODE_ENV === "development";

  const stepNames = [
    "Personal Info",
    "Skills",
    "Experience",
    "Projects",
    "Theme & Colors",
    "Final Setup",
  ];

  useEffect(() => {
    if (isDev) {
      const files = localStorage.getItem("portfolio-generated-files");
      if (files) {
        setGeneratedFiles(JSON.parse(files));
      }

      // Check for saved step
      const savedStepStr = localStorage.getItem("onboarding-last-step");
      if (savedStepStr) {
        const stepNum = parseInt(savedStepStr, 10);
        if (stepNum >= 0 && stepNum < stepNames.length) {
          setSavedStep(stepNum);
        }
      }

      // Load collapsed state from localStorage
      const collapsedState = localStorage.getItem("dev-tools-collapsed");
      if (collapsedState === "true") {
        setIsCollapsed(true);
      }
    }
  }, [isDev, stepNames.length]);

  // Save collapsed state to localStorage
  useEffect(() => {
    if (isDev) {
      localStorage.setItem("dev-tools-collapsed", isCollapsed.toString());
    }
  }, [isCollapsed, isDev]);

  const handleDownloadFiles = () => {
    if (generatedFiles.length > 0) {
      const links = createDownloadLinks(generatedFiles);
      links.forEach(link => link.download());
    }
  };

  const handleClearFiles = () => {
    localStorage.removeItem("portfolio-generated-files");
    localStorage.removeItem("portfolio-personal-info");
    setGeneratedFiles([]);
  };

  const handleEditOnboarding = () => {
    // Save current page position before opening modal
    localStorage.setItem("onboarding-last-step", currentStep.toString());
    setIsOnboardingOpen(true);
  };

  const handleResetOnboarding = () => {
    // Clear saved step when resetting
    localStorage.removeItem("onboarding-last-step");
    resetOnboarding();
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (!isDev) {
    return null;
  }

  return (
    <motion.div
      className="fixed bottom-4 right-4 w-80 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card className="shadow-lg border-primary/20 bg-primary/5">
        <CardHeader className="pb-3 pt-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">
              🚀 Development Tools
            </CardTitle>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleCollapse}
                className="h-6 w-6 p-0 hover:bg-primary/10"
              >
                <motion.div
                  animate={{ rotate: isCollapsed ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </CardHeader>

        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <CardContent className="space-y-3 pt-0">
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                  className="text-xs text-muted-foreground space-y-1"
                >
                  <div>
                    Onboarding Status:{" "}
                    {isCompleted ? "Completed" : "Not Started"}
                  </div>
                  <div>
                    Data Status:{" "}
                    {isDataCustomized(onboardingData)
                      ? "Customized"
                      : "Default"}
                  </div>
                  <div>
                    Personal Info:{" "}
                    {onboardingData.personalInfo.name !== "Your Name"
                      ? "✓ Set"
                      : "Default"}
                  </div>
                  <div>Skills: {onboardingData.skills.length} items</div>
                  <div>Projects: {onboardingData.projects.length} items</div>
                  <div>
                    Contact Service: {onboardingData.contactForm.service}
                  </div>
                  <div>Current Step: {currentStep + 1}/6</div>
                  {savedStep !== null && (
                    <div>
                      Saved Step: {savedStep + 1}/6 ({stepNames[savedStep]})
                    </div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.2 }}
                  className="flex flex-col gap-2"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleEditOnboarding}
                      className="flex items-center gap-2 w-full"
                    >
                      <Edit3 className="h-4 w-4" />
                      Edit Onboarding
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleResetOnboarding}
                      className="flex items-center gap-2 text-orange-600 hover:text-orange-700 w-full"
                    >
                      <Trash2 className="h-4 w-4" />
                      Reset Onboarding
                    </Button>
                  </motion.div>

                  <AnimatePresence>
                    {generatedFiles.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-2"
                      >
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleDownloadFiles}
                            className="flex items-center gap-2 w-full"
                          >
                            <Download className="h-4 w-4" />
                            Download Generated Files
                          </Button>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleClearFiles}
                            className="flex items-center gap-2 text-red-600 hover:text-red-700 w-full"
                          >
                            <Trash2 className="h-4 w-4" />
                            Clear Generated Files
                          </Button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.2 }}
                  className="text-xs text-muted-foreground/70 pt-2 border-t"
                >
                  <p>
                    💡 Edit: Resume from{" "}
                    {savedStep !== null ? stepNames[savedStep] : "current step"}
                  </p>
                  <p>🔄 Reset: Start from beginning</p>
                </motion.div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};
