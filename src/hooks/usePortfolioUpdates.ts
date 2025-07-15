import { usePortfolioStore } from "../stores/portfolio-store";
import { OnboardingData } from "./useOnboarding";

/**
 * Hook for immediate portfolio updates during onboarding
 * This updates the Zustand store immediately for real-time UI updates
 */
export const usePortfolioUpdates = () => {
  const {
    setContactConfig,
    setPersonalInfo,
    setSkills,
    setWorkExperience,
    setEducation,
    setProjects,
    updateAllData,
  } = usePortfolioStore();

  const updatePortfolioData = (data: OnboardingData) => {
    updateAllData({
      personalInfo: data.personalInfo,
      skills: data.skills,
      workExperience: data.workExperience,
      education: data.education,
      projects: data.projects,
      contactConfig: data.contactForm,
    });
  };

  const updateContactConfig = (
    service: "formspree" | "netlify" | "custom" | "none",
    endpoint?: string
  ) => {
    setContactConfig({ service, endpoint });
  };

  return {
    updatePortfolioData,
    updateContactConfig,
    setPersonalInfo,
    setSkills,
    setWorkExperience,
    setEducation,
    setProjects,
  };
};
