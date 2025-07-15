"use client";

import { createContext, useContext, ReactNode } from "react";
import { useOnboarding } from "@/hooks/useOnboarding";

const OnboardingContext = createContext<
  ReturnType<typeof useOnboarding> | undefined
>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const onboardingValue = useOnboarding();

  return (
    <OnboardingContext.Provider value={onboardingValue}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboardingContext = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error(
      "useOnboardingContext must be used within an OnboardingProvider"
    );
  }
  return context;
};
