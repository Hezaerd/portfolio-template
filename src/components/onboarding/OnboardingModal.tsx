"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Form } from "@/components/ui/form";
import { useOnboardingContext } from "@/contexts/OnboardingContext";
import { PersonalInfoStep } from "./steps/PersonalInfoStep";
import { SkillsStep } from "./steps/SkillsStep";
import { ExperienceStep } from "./steps/ExperienceStep";
import { ProjectsStep } from "./steps/ProjectsStep";
import { ThemeReferenceStep } from "./steps/ThemeReferenceStep";
import { FinalSetupStep } from "./steps/FinalSetupStep";
import { generatePortfolioFiles } from "@/lib/fileGenerator";
import { usePortfolioUpdates } from "../../hooks/usePortfolioUpdates";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const steps = [
  { title: "Personal Information", component: PersonalInfoStep },
  { title: "Skills", component: SkillsStep },
  { title: "Experience", component: ExperienceStep },
  { title: "Projects", component: ProjectsStep },
  { title: "Form Setup", component: FinalSetupStep },
  { title: "Theme & Colors", component: ThemeReferenceStep },
];

export const OnboardingModal = () => {
  const {
    isOnboardingOpen,
    setIsOnboardingOpen,
    currentStep,
    onboardingData,
    nextStep,
    prevStep,
    completeOnboarding,
    form,
    formState,
    setCurrentStep,
  } = useOnboardingContext();
  const { updatePortfolioData } = usePortfolioUpdates();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState(0); // 1 for forward, -1 for backward
  const dotsContainerRef = useRef<HTMLDivElement>(null);

  const CurrentStepComponent = steps[currentStep]?.component;
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = async () => {
    setDirection(1); // Moving forward
    if (isLastStep) {
      await handleComplete();
    } else {
      await nextStep();
    }
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex !== currentStep) {
      setDirection(stepIndex > currentStep ? 1 : -1); // Set direction based on target step
      setCurrentStep(stepIndex);

      // Only show toast if user hasn't seen it before
      const hasSeenStepJumpToast = localStorage.getItem(
        "onboarding-step-jump-toast-seen"
      );
      if (!hasSeenStepJumpToast) {
        toast.info(`Jumped to ${steps[stepIndex].title}`, {
          description: "You can navigate back to continue where you left off.",
        });
        localStorage.setItem("onboarding-step-jump-toast-seen", "true");
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (dotsContainerRef.current) {
      const containerRect = dotsContainerRef.current.getBoundingClientRect();
      const relativeX = e.clientX - containerRect.left;
      const relativeY = e.clientY - containerRect.top;
      setMousePosition({ x: relativeX, y: relativeY });
    }
  };

  const getDotOffset = (index: number) => {
    if (hoveredStep === null) return { x: 0, y: 0 };

    if (index === hoveredStep) {
      // Hovered dot follows cursor by 1-2px
      const dotCenterX = index * 20 + 6; // 20px gap + 6px center offset
      const dotCenterY = 6; // 6px center offset
      const offsetX = Math.max(
        -2,
        Math.min(2, (mousePosition.x - dotCenterX) * 0.1)
      );
      const offsetY = Math.max(
        -2,
        Math.min(2, (mousePosition.y - dotCenterY) * 0.1)
      );
      return { x: offsetX, y: offsetY };
    } else {
      // Other dots move away with fluid effect
      const distance = Math.abs(index - hoveredStep);
      const direction = index < hoveredStep ? -1 : 1;
      const influence = Math.max(0, 1 - distance * 0.5);
      const offsetX = direction * influence * 3;
      const offsetY = influence * Math.sin(Date.now() * 0.002 + index) * 0.5;
      return { x: offsetX, y: offsetY };
    }
  };

  const handleSaveProgress = async () => {
    try {
      // Update Zustand store immediately for instant UI updates
      updatePortfolioData(onboardingData);

      // Update the files with current progress (don't complete onboarding)
      await generatePortfolioFiles(onboardingData);

      toast.success("Progress saved successfully!", {
        description: "Your portfolio data has been updated.",
      });
      console.log("✅ Progress saved successfully!");
    } catch (error) {
      console.error("Error saving progress:", error);
      toast.error("Failed to save progress", {
        description: "Please try again or check the console for details.",
      });
    }
  };

  const handleComplete = () => {
    // Update Zustand store for immediate UI updates
    updatePortfolioData(onboardingData);

    // Simply mark onboarding as complete - files are saved via "Save Progress"
    completeOnboarding();

    // Check if this is the first time completing onboarding
    const hasCompletedBefore = localStorage.getItem(
      "onboarding-completed-before"
    );
    if (!hasCompletedBefore) {
      // Trigger confetti explosion for first-time completion
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: [
          "#3b82f6",
          "#8b5cf6",
          "#06b6d4",
          "#10b981",
          "#f59e0b",
          "#ef4444",
        ],
        zIndex: 9999,
      });

      // Mark as completed
      localStorage.setItem("onboarding-completed-before", "true");
    }

    toast.success("Onboarding completed!", {
      description:
        "Your portfolio setup is now complete. Remember to save any final changes.",
    });
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  // Get validation errors for current step
  const getCurrentStepErrors = () => {
    const stepFieldMaps = [
      ["personalInfo"], // Step 0
      ["skills"], // Step 1
      ["workExperience", "education"], // Step 2
      ["projects"], // Step 3
      ["contactForm", "deployment"], // Step 4 - Form Setup
      [], // Step 5 - Theme step
    ];

    const fieldNames = stepFieldMaps[currentStep] || [];
    return fieldNames.some(
      fieldName => formState.errors[fieldName as keyof typeof formState.errors]
    );
  };

  const hasCurrentStepErrors = getCurrentStepErrors();

  return (
    <Dialog
      open={isOnboardingOpen}
      onOpenChange={open => {
        // Save current step when modal is closed
        if (!open) {
          localStorage.setItem("onboarding-last-step", currentStep.toString());
        }
        setIsOnboardingOpen(open);
      }}
    >
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Portfolio Setup - {steps[currentStep]?.title}
          </DialogTitle>
          <div className="space-y-2">
            <Progress value={progressPercentage} className="w-full" />
            <p className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-6">
            <div className="py-6 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {CurrentStepComponent && (
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: direction * 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -20 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 25,
                      duration: 0.15,
                    }}
                  >
                    <CurrentStepComponent />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setDirection(-1); // Moving backward
                  prevStep();
                }}
                disabled={isFirstStep}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex flex-col items-center gap-2">
                <div
                  ref={dotsContainerRef}
                  className="flex gap-2 relative py-2"
                  style={{ minHeight: "24px" }}
                >
                  {steps.map((step, index) => {
                    const offset = getDotOffset(index);
                    return (
                      <div key={index} className="relative">
                        <motion.button
                          type="button"
                          onClick={() => handleStepClick(index)}
                          onMouseEnter={() => setHoveredStep(index)}
                          onMouseLeave={() => setHoveredStep(null)}
                          onMouseMove={e => handleMouseMove(e, index)}
                          className={`w-3 h-3 rounded-full cursor-pointer ${
                            index <= currentStep ? "bg-primary" : "bg-muted"
                          }`}
                          aria-label={`Go to ${step.title}`}
                          initial={{ scale: 1, x: 0, y: 0 }}
                          animate={{
                            scale: hoveredStep === index ? 1.5 : 1,
                            x: offset.x,
                            y: offset.y,
                          }}
                          whileHover={{
                            scale: 1.5,
                          }}
                          whileTap={{
                            scale: 1.2,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: hoveredStep === index ? 400 : 200,
                            damping: hoveredStep === index ? 25 : 15,
                            mass: 0.5,
                          }}
                        />

                        {/* Hover preview label */}
                        <AnimatePresence>
                          {hoveredStep === index && (
                            <motion.div
                              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-md border whitespace-nowrap z-10"
                              initial={{ opacity: 0, y: 5, scale: 0.8 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 5, scale: 0.8 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 25,
                                duration: 0.15,
                              }}
                            >
                              {step.title}
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-border"></div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleSaveProgress}
                  className="text-xs text-muted-foreground hover:text-primary"
                >
                  💾 Save Progress
                </Button>

                {hasCurrentStepErrors && (
                  <p className="text-xs text-red-600">
                    Please fix the errors above before continuing
                  </p>
                )}
              </div>

              <Button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2"
                disabled={hasCurrentStepErrors}
              >
                {isLastStep ? "Complete Setup" : "Next"}
                {!isLastStep && <ChevronRight className="h-4 w-4" />}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
