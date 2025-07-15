"use client";

import { useOnboardingContext } from "@/contexts/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Edit3,
  Download,
  Trash2,
  ChevronUp,
  ChevronDown,
  RefreshCw,
  Settings,
  Info,
  FileText,
} from "lucide-react";
import { createDownloadLinks } from "@/lib/fileGenerator";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioUpdates } from "../../hooks/usePortfolioUpdates";

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
  const { reloadFromFiles } = usePortfolioUpdates();
  const [generatedFiles, setGeneratedFiles] = useState<any[]>([]);
  const [savedStep, setSavedStep] = useState<number | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
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

      const savedStepStr = localStorage.getItem("onboarding-last-step");
      if (savedStepStr) {
        const stepNum = parseInt(savedStepStr, 10);
        if (stepNum >= 0 && stepNum < stepNames.length) {
          setSavedStep(stepNum);
        }
      }

      const collapsedState = localStorage.getItem("dev-tools-collapsed");
      if (collapsedState === "true") {
        setIsCollapsed(true);
      }
    }
  }, [isDev, stepNames.length]);

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
    localStorage.setItem("onboarding-last-step", currentStep.toString());
    setIsOnboardingOpen(true);
  };

  const handleResetOnboarding = () => {
    localStorage.removeItem("onboarding-last-step");
    resetOnboarding();
  };

  const handleReloadFromFiles = async () => {
    setIsReloading(true);
    try {
      await reloadFromFiles();
      console.log("✅ Data reloaded from files");
    } catch (error) {
      console.error("❌ Error reloading from files:", error);
    } finally {
      setIsReloading(false);
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (!isDev) {
    return null;
  }

  // Quick status indicators
  const statusData = {
    onboardingComplete: isCompleted,
    dataCustomized: isDataCustomized(onboardingData),
    personalInfoSet:
      onboardingData.personalInfo.name !== "Your Name" &&
      onboardingData.personalInfo.name !== "",
    skillsCount: onboardingData.skills.length,
    projectsCount: onboardingData.projects.length,
    contactService: onboardingData.contactForm.service,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <Card className="w-80 shadow-lg border-2 border-red-200 dark:border-red-800">
        <CardHeader className="py-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="leading-none">Dev Tools</span>
              <Badge
                variant="secondary"
                className="text-xs leading-none px-2 py-0.5"
              >
                Development
              </Badge>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCollapse}
              className="h-8 w-8 p-0"
            >
              {isCollapsed ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
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
              <CardContent className="pt-0">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview" className="text-xs">
                      <Info className="h-3 w-3 mr-1" />
                      Status
                    </TabsTrigger>
                    <TabsTrigger value="actions" className="text-xs">
                      <Settings className="h-3 w-3 mr-1" />
                      Actions
                    </TabsTrigger>
                    <TabsTrigger value="files" className="text-xs">
                      <FileText className="h-3 w-3 mr-1" />
                      Files
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-3 mt-3">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span>Onboarding:</span>
                        <Badge
                          variant={
                            statusData.onboardingComplete
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {statusData.onboardingComplete ? "Done" : "Pending"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Data:</span>
                        <Badge
                          variant={
                            statusData.dataCustomized ? "default" : "secondary"
                          }
                          className="text-xs"
                        >
                          {statusData.dataCustomized ? "Custom" : "Default"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Personal:</span>
                        <Badge
                          variant={
                            statusData.personalInfoSet ? "default" : "secondary"
                          }
                          className="text-xs"
                        >
                          {statusData.personalInfoSet ? "Set" : "Default"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Contact:</span>
                        <Badge
                          variant={
                            statusData.contactService !== "none"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {statusData.contactService}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs text-center">
                      <div>
                        <div className="font-medium">
                          {statusData.skillsCount}
                        </div>
                        <div className="text-muted-foreground">Skills</div>
                      </div>
                      <div>
                        <div className="font-medium">
                          {statusData.projectsCount}
                        </div>
                        <div className="text-muted-foreground">Projects</div>
                      </div>
                      <div>
                        <div className="font-medium">{currentStep + 1}/6</div>
                        <div className="text-muted-foreground">Step</div>
                      </div>
                    </div>

                    {savedStep !== null && (
                      <div className="text-xs text-center p-2 bg-muted rounded">
                        <span className="text-muted-foreground">
                          Saved at:{" "}
                        </span>
                        <span className="font-medium">
                          {stepNames[savedStep]}
                        </span>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="actions" className="space-y-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleEditOnboarding}
                      className="w-full flex items-center gap-2"
                    >
                      <Edit3 className="h-4 w-4" />
                      Edit Onboarding
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReloadFromFiles}
                      disabled={isReloading}
                      className="w-full flex items-center gap-2 text-blue-600 hover:text-blue-700"
                    >
                      <RefreshCw
                        className={`h-4 w-4 ${isReloading ? "animate-spin" : ""}`}
                      />
                      Reload from Files
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleResetOnboarding}
                      className="w-full flex items-center gap-2 text-orange-600 hover:text-orange-700"
                    >
                      <Trash2 className="h-4 w-4" />
                      Reset Onboarding
                    </Button>
                  </TabsContent>

                  <TabsContent value="files" className="space-y-2 mt-3">
                    {generatedFiles.length > 0 ? (
                      <>
                        <div className="text-xs text-muted-foreground">
                          {generatedFiles.length} files generated
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDownloadFiles}
                          className="w-full flex items-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download Files
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleClearFiles}
                          className="w-full flex items-center gap-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                          Clear Generated Files
                        </Button>
                      </>
                    ) : (
                      <div className="text-xs text-center text-muted-foreground py-4">
                        No generated files yet.
                        <br />
                        Complete onboarding to generate files.
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};
