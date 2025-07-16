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
    setResume,
    setSkills,
    setWorkExperience,
    setEducation,
    setProjects,
    updateAllData,
    reloadFromFiles,
  } = usePortfolioStore();

  const updatePortfolioData = (data: OnboardingData) => {
    updateAllData({
      personalInfo: data.personalInfo,
      resume: data.resume,
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
    setResume,
    setSkills,
    setWorkExperience,
    setEducation,
    setProjects,
    reloadFromFiles,
  };
};
