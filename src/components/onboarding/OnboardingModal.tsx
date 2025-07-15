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

const steps = [
  { title: "Personal Information", component: PersonalInfoStep },
  { title: "Skills", component: SkillsStep },
  { title: "Experience", component: ExperienceStep },
  { title: "Projects", component: ProjectsStep },
  { title: "Theme & Colors", component: ThemeReferenceStep },
  { title: "Final Setup", component: FinalSetupStep },
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
  } = useOnboardingContext();
  const { updatePortfolioData } = usePortfolioUpdates();

  const CurrentStepComponent = steps[currentStep]?.component;
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = async () => {
    if (isLastStep) {
      await handleComplete();
    } else {
      await nextStep();
    }
  };

  const handleComplete = async () => {
    try {
      // Update Zustand store immediately for instant UI updates
      updatePortfolioData(onboardingData);

      // Then update the files
      await generatePortfolioFiles(onboardingData);
      completeOnboarding();
    } catch (error) {
      console.error("Error generating portfolio files:", error);
      // Still complete onboarding even if file generation fails
      completeOnboarding();
    }
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  // Get validation errors for current step
  const getCurrentStepErrors = () => {
    const stepFieldMaps = [
      ["personalInfo"], // Step 0
      ["skills"], // Step 1
      ["workExperience", "education"], // Step 2
      ["projects"], // Step 3
      [], // Step 4 - Theme step
      ["contactForm", "deployment"], // Step 5
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
            <div className="py-6">
              {CurrentStepComponent && <CurrentStepComponent />}
            </div>

            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={isFirstStep}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex flex-col items-center gap-2">
                <div className="flex gap-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index <= currentStep ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
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
