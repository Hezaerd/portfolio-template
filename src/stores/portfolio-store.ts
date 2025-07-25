import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ContactConfig } from "../data/contact-config";

// Types that match the data files
export interface PersonalInfo {
  name: string;
  role: string;
  bio: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
  twitter?: string;
  website?: string;
}

export interface WorkExperience {
  title: string;
  company: string;
  period: string;
  description: string;
  color: "primary" | "accent";
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  highlight?: string;
  longDescription?: string;
  features?: string[];
  challenges?: string[];
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  duration?: string;
  teamSize?: string;
  role?: string;
}

export interface Resume {
  fileName: string; // e.g., "resume.pdf"
  originalName: string; // Original file name from user
  size: number;
}

export interface PortfolioState {
  // Configuration
  contactConfig: ContactConfig;

  // Data
  personalInfo: PersonalInfo;
  resume: Resume;
  skills: string[];
  workExperience: WorkExperience[];
  education: Education[];
  projects: Project[];

  // UI State
  isLoaded: boolean;

  // Actions
  setContactConfig: (config: ContactConfig) => void;
  setPersonalInfo: (info: PersonalInfo) => void;
  setResume: (resume: Resume) => void;
  setSkills: (skills: string[]) => void;
  setWorkExperience: (experience: WorkExperience[]) => void;
  setEducation: (education: Education[]) => void;
  setProjects: (projects: Project[]) => void;
  updateAllData: (data: {
    personalInfo?: PersonalInfo;
    resume?: Resume;
    skills?: string[];
    workExperience?: WorkExperience[];
    education?: Education[];
    projects?: Project[];
    contactConfig?: ContactConfig;
  }) => void;
  loadInitialData: () => Promise<void>;
  reloadFromFiles: () => Promise<void>;
  setIsLoaded: (loaded: boolean) => void;
}

// Use actual data as defaults instead of placeholder data
const defaultContactConfig: ContactConfig = {
  service: "none",
  endpoint: "",
};

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, _get) => ({
      // Initial state - will be loaded from files
      contactConfig: defaultContactConfig,
      personalInfo: {
        name: "Your Name",
        role: "Your Role",
        bio: "Your bio here",
        email: "",
        location: "",
        github: "",
        linkedin: "",
      },
      resume: {
        fileName: "",
        originalName: "",
        size: 0,
      },
      skills: [],
      workExperience: [],
      education: [],
      projects: [],
      isLoaded: false,

      // Actions
      setContactConfig: (config: ContactConfig) => {
        set({ contactConfig: config });
      },

      setPersonalInfo: (info: PersonalInfo) => {
        set({ personalInfo: info });
      },

      setResume: (resume: Resume) => {
        set({ resume });
      },

      setSkills: (skills: string[]) => {
        set({ skills });
      },

      setWorkExperience: (experience: WorkExperience[]) => {
        set({ workExperience: experience });
      },

      setEducation: (education: Education[]) => {
        set({ education });
      },

      setProjects: (projects: Project[]) => {
        set({ projects });
      },

      updateAllData: data => {
        set(state => ({
          ...state,
          ...data,
        }));
      },

      setIsLoaded: (loaded: boolean) => {
        set({ isLoaded: loaded });
      },

      loadInitialData: async () => {
        try {
          // Load fresh data from files to sync any manual changes
          // Add cache busting to ensure we get the latest file contents
          const cacheBuster = Date.now();
          const [
            personalInfoModule,
            resumeModule,
            skillsModule,
            experienceModule,
            projectsModule,
            contactConfigModule,
          ] = await Promise.all([
            import(`../data/personal-info?v=${cacheBuster}`),
            import(`../data/resume?v=${cacheBuster}`),
            import(`../data/skills?v=${cacheBuster}`),
            import(`../data/experience?v=${cacheBuster}`),
            import(`../data/projects?v=${cacheBuster}`),
            import(`../data/contact-config?v=${cacheBuster}`),
          ]);

          set({
            personalInfo: personalInfoModule.personalInfo,
            resume: resumeModule.resume,
            skills: skillsModule.skills,
            workExperience: experienceModule.workExperience,
            education: experienceModule.education,
            projects: projectsModule.projects,
            contactConfig: contactConfigModule.contactConfig,
            isLoaded: true,
          });

          console.log("✅ Portfolio data loaded into Zustand store");
        } catch (error) {
          console.error("❌ Error loading portfolio data:", error);
          set({ isLoaded: true }); // Mark as loaded even on error to prevent infinite loading
        }
      },

      reloadFromFiles: async () => {
        set({ isLoaded: false });
        await _get().loadInitialData();
      },
    }),
    {
      name: "portfolio-storage",
      // Don't persist isLoaded - it should reset on page refresh
      partialize: state => ({
        contactConfig: state.contactConfig,
        personalInfo: state.personalInfo,
        resume: state.resume,
        skills: state.skills,
        workExperience: state.workExperience,
        education: state.education,
        projects: state.projects,
      }),
    }
  )
);

// Selectors for easier access
export const useContactConfig = () =>
  usePortfolioStore(state => state.contactConfig);
export const usePersonalInfo = () =>
  usePortfolioStore(state => state.personalInfo);
export const useSkills = () => usePortfolioStore(state => state.skills);
export const useWorkExperience = () =>
  usePortfolioStore(state => state.workExperience);
export const useEducation = () => usePortfolioStore(state => state.education);
export const useProjects = () => usePortfolioStore(state => state.projects);
export const useIsPortfolioLoaded = () =>
  usePortfolioStore(state => state.isLoaded);
