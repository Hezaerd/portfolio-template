import { useState, useEffect, useCallback } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema, stepSchemas } from "@/lib/validationSchemas";

export interface OnboardingData {
  personalInfo: {
    name: string;
    bio: string;
    role: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
    twitter?: string;
    website?: string;
  };
  skills: string[];
  workExperience: {
    title: string;
    company: string;
    period: string;
    description: string;
    color: "primary" | "accent";
  }[];
  education: {
    degree: string;
    school: string;
    period: string;
    description: string;
  }[];
  projects: {
    title: string;
    description: string;
    longDescription?: string;
    tags: string[];
    highlight?: string;
    features?: string[];
    challenges?: string[];
    technologies?: string[];
    githubUrl?: string;
    liveUrl?: string;
    duration?: string;
    teamSize?: string;
    role?: string;
  }[];
  contactForm: {
    service: "formspree" | "netlify" | "custom" | "none";
    endpoint?: string;
  };
  deployment: {
    platform: "vercel" | "netlify" | "other" | "none";
    customDomain?: string;
  };
}

export const defaultOnboardingData: OnboardingData = {
  personalInfo: {
    name: "",
    bio: "",
    role: "",
    location: "",
    email: "",
    github: "",
    linkedin: "",
  },
  skills: [],
  workExperience: [],
  education: [],
  projects: [],
  contactForm: {
    service: "none",
  },
  deployment: {
    platform: "none",
  },
};

export const useOnboarding = () => {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Main form using React Hook Form + Zod
  const form = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema) as any,
    defaultValues: defaultOnboardingData,
    mode: "onChange", // Real-time validation
  });

  const { watch, setValue, getValues, trigger, formState } = form;
  const onboardingData = watch(); // Get current form values

  // Helper function to check if data looks customized (not defaults)
  const isDataCustomized = useCallback((data: OnboardingData) => {
    const hasCustomPersonalInfo =
      data.personalInfo.name !== "Your Name" &&
      data.personalInfo.name !== "" &&
      data.personalInfo.email !== "your.email@example.com" &&
      data.personalInfo.email !== "";

    const hasCustomContent =
      data.skills.length > 0 ||
      data.workExperience.length > 0 ||
      data.projects.length > 0;

    return hasCustomPersonalInfo || hasCustomContent;
  }, []);

  // Load existing data from data files to pre-fill onboarding
  const loadExistingData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Import data directly from data files
      const [
        { personalInfo },
        { skills },
        { workExperience, education },
        { projects },
        { contactConfig },
      ] = await Promise.all([
        import("@/data/personal-info"),
        import("@/data/skills"),
        import("@/data/experience"),
        import("@/data/projects"),
        import("@/data/contact-config"),
      ]);

      // Pre-fill form with existing data
      const existingData: OnboardingData = {
        personalInfo: {
          name: personalInfo.name || "",
          role: personalInfo.role || "",
          bio: personalInfo.bio || "",
          email: personalInfo.email || "",
          location: personalInfo.location || "",
          github: personalInfo.github || "",
          linkedin: personalInfo.linkedin || "",
          twitter: personalInfo.twitter || "",
          website: personalInfo.website || "",
        },
        skills: skills.length > 0 ? skills : [],
        workExperience: workExperience.length > 0 ? workExperience : [],
        education: education.length > 0 ? education : [],
        projects: projects.length > 0 ? projects : [],
        contactForm: {
          service: contactConfig.service || "none",
          endpoint: contactConfig.endpoint || "",
        },
        deployment: {
          platform: "none",
          customDomain: "",
        },
      };

      // Reset form with existing data
      form.reset(existingData);

      console.log("✅ Existing data loaded for onboarding pre-fill", {
        personalInfo: personalInfo.name,
        skillsCount: skills.length,
        workExperienceCount: workExperience.length,
        projectsCount: projects.length,
        contactService: contactConfig.service,
      });
    } catch (error) {
      console.error("Error loading existing data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [form]);

  // Check if onboarding is completed and load existing data
  useEffect(() => {
    const completed = localStorage.getItem("portfolio-onboarding-completed");
    const isDev = process.env.NODE_ENV === "development";

    // Always load existing data to pre-fill the form
    loadExistingData();

    // In development, show onboarding if not completed
    if (isDev && !completed) {
      setIsOnboardingOpen(true);
    }

    setIsCompleted(!!completed);
  }, [loadExistingData]);

  // Restore saved onboarding step when modal opens
  useEffect(() => {
    if (isOnboardingOpen) {
      const savedStep = localStorage.getItem("onboarding-last-step");
      if (savedStep) {
        const stepNumber = parseInt(savedStep, 10);
        if (stepNumber >= 0 && stepNumber < 6) {
          setCurrentStep(stepNumber);
        }
      }
    }
  }, [isOnboardingOpen]);

  // Update completion status based on data customization
  useEffect(() => {
    const completed = localStorage.getItem("portfolio-onboarding-completed");
    const dataCustomized = isDataCustomized(onboardingData);

    // If data is customized but not marked as completed, mark it as completed
    if (dataCustomized && !completed) {
      localStorage.setItem("portfolio-onboarding-completed", "true");
      setIsCompleted(true);
    }
  }, [onboardingData, isDataCustomized]);

  // Validate current step
  const validateCurrentStep = useCallback(async () => {
    const stepFields = [
      ["personalInfo"], // Step 0
      ["skills"], // Step 1
      ["workExperience", "education"], // Step 2
      ["projects"], // Step 3
      [], // Step 4 - Theme step (no validation needed)
      ["contactForm", "deployment"], // Step 5
    ];

    const fieldsToValidate = stepFields[currentStep] || [];

    if (fieldsToValidate.length === 0) return true;

    const isValid = await trigger(fieldsToValidate as any);
    return isValid;
  }, [currentStep, trigger]);

  const completeOnboarding = useCallback(() => {
    localStorage.setItem("portfolio-onboarding-completed", "true");
    setIsCompleted(true);
    setIsOnboardingOpen(false);
  }, []);

  const resetOnboarding = useCallback(() => {
    localStorage.removeItem("portfolio-onboarding-completed");
    setIsCompleted(false);
    setCurrentStep(0);
    form.reset(defaultOnboardingData);
    setIsOnboardingOpen(true);
    // Load existing data to pre-fill the form even on reset
    loadExistingData();
  }, [form, loadExistingData]);

  const nextStep = useCallback(async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      setCurrentStep(prev => {
        const newStep = prev + 1;
        // Save step when navigating
        localStorage.setItem("onboarding-last-step", newStep.toString());
        return newStep;
      });
    }
  }, [validateCurrentStep]);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => {
      const newStep = Math.max(0, prev - 1);
      // Save step when navigating
      localStorage.setItem("onboarding-last-step", newStep.toString());
      return newStep;
    });
  }, []);

  // Enhanced setCurrentStep that saves to localStorage
  const setCurrentStepWithSave = useCallback(
    (step: number | ((prev: number) => number)) => {
      setCurrentStep(prev => {
        const newStep = typeof step === "function" ? step(prev) : step;
        localStorage.setItem("onboarding-last-step", newStep.toString());
        return newStep;
      });
    },
    []
  );

  return {
    // Form instance and data
    form,
    onboardingData,

    // UI state
    isOnboardingOpen,
    setIsOnboardingOpen,
    currentStep,
    setCurrentStep: setCurrentStepWithSave,
    isCompleted,
    isLoading,

    // Form state from React Hook Form
    formState,

    // Actions
    completeOnboarding,
    resetOnboarding,
    nextStep,
    prevStep,
    validateCurrentStep,
    loadExistingData,
    isDataCustomized,

    // Form utilities
    setValue,
    getValues,
    trigger,
  };
};
