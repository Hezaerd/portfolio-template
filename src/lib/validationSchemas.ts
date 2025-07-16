import { z } from "zod";

// Resume Upload Step Schema
export const resumeSchema = z.object({
  fileName: z.string().optional().or(z.literal("")),
  originalName: z.string().optional().or(z.literal("")),
  size: z.number().optional().default(0),
});

// Personal Information Step Schema
export const personalInfoSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  role: z
    .string()
    .min(1, "Role is required")
    .max(100, "Role must be less than 100 characters"),
  bio: z
    .string()
    .min(1, "Bio is required")
    .max(500, "Bio must be less than 500 characters"),
  email: z.string().email("Please enter a valid email address"),
  location: z
    .string()
    .max(100, "Location must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  github: z
    .string()
    .min(1, "GitHub URL is required")
    .url("Please enter a valid GitHub URL")
    .refine(
      url => url.includes("github.com"),
      "Please enter a valid GitHub URL"
    ),
  linkedin: z
    .string()
    .min(1, "LinkedIn URL is required")
    .url("Please enter a valid LinkedIn URL")
    .refine(
      url => url.includes("linkedin.com"),
      "Please enter a valid LinkedIn URL"
    ),
  twitter: z
    .string()
    .url("Please enter a valid Twitter URL")
    .refine(
      url => url.includes("twitter.com") || url.includes("x.com"),
      "Please enter a valid Twitter/X URL"
    )
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .url("Please enter a valid website URL")
    .optional()
    .or(z.literal("")),
});

// Skills Step Schema
export const skillsSchema = z.object({
  skills: z
    .array(z.string())
    .min(1, "Please add at least one skill")
    .max(50, "Maximum 50 skills allowed"),
});

// Work Experience Schema
export const workExperienceSchema = z.object({
  title: z
    .string()
    .min(1, "Job title is required")
    .max(100, "Title must be less than 100 characters"),
  company: z
    .string()
    .min(1, "Company name is required")
    .max(100, "Company must be less than 100 characters"),
  period: z
    .string()
    .min(1, "Period is required")
    .max(50, "Period must be less than 50 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional()
    .or(z.literal("")),
  color: z.enum(["primary", "accent"]),
});

// Education Schema
export const educationSchema = z.object({
  degree: z
    .string()
    .min(1, "Degree is required")
    .max(100, "Degree must be less than 100 characters"),
  school: z
    .string()
    .min(1, "School name is required")
    .max(100, "School must be less than 100 characters"),
  period: z
    .string()
    .min(1, "Period is required")
    .max(50, "Period must be less than 50 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional()
    .or(z.literal("")),
});

// Experience Step Schema
export const experienceSchema = z.object({
  workExperience: z.array(workExperienceSchema).optional().default([]),
  education: z.array(educationSchema).optional().default([]),
});

// Project Schema
export const projectSchema = z.object({
  title: z
    .string()
    .min(1, "Project title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(300, "Description must be less than 300 characters"),
  longDescription: z
    .string()
    .max(1000, "Long description must be less than 1000 characters")
    .optional()
    .or(z.literal("")),
  tags: z
    .array(z.string())
    .min(1, "Please add at least one tag")
    .max(20, "Maximum 20 tags allowed"),
  highlight: z
    .string()
    .max(50, "Highlight must be less than 50 characters")
    .optional()
    .or(z.literal("")),
  features: z
    .array(z.string())
    .max(20, "Maximum 20 features allowed")
    .optional()
    .default([]),
  challenges: z
    .array(z.string())
    .max(20, "Maximum 20 challenges allowed")
    .optional()
    .default([]),
  technologies: z
    .array(z.string())
    .max(20, "Maximum 20 technologies allowed")
    .optional()
    .default([]),
  githubUrl: z
    .string()
    .url("Please enter a valid GitHub URL")
    .optional()
    .or(z.literal("")),
  liveUrl: z
    .string()
    .url("Please enter a valid live URL")
    .optional()
    .or(z.literal("")),
  duration: z
    .string()
    .max(50, "Duration must be less than 50 characters")
    .optional()
    .or(z.literal("")),
  teamSize: z
    .string()
    .max(50, "Team size must be less than 50 characters")
    .optional()
    .or(z.literal("")),
  role: z
    .string()
    .max(100, "Role must be less than 100 characters")
    .optional()
    .or(z.literal("")),
});

// Projects Step Schema
export const projectsSchema = z.object({
  projects: z.array(projectSchema).optional().default([]),
});

// Contact Form Schema
export const contactFormSchema = z.object({
  service: z.enum(["formspree", "netlify", "custom", "none"]),
  endpoint: z
    .string()
    .url("Please enter a valid endpoint URL")
    .optional()
    .or(z.literal("")),
});

// Deployment Schema
export const deploymentSchema = z.object({
  platform: z.enum(["vercel", "netlify", "other", "none"]),
  customDomain: z.string().optional().or(z.literal("")),
});

// Final Setup Step Schema
export const finalSetupSchema = z.object({
  contactForm: contactFormSchema,
  deployment: deploymentSchema,
});

// Complete Onboarding Schema
export const onboardingSchema = z.object({
  personalInfo: personalInfoSchema,
  resume: resumeSchema.default({
    fileName: "",
    originalName: "",
    size: 0,
  }),
  skills: z.array(z.string()).default([]),
  workExperience: z.array(workExperienceSchema).default([]),
  education: z.array(educationSchema).default([]),
  projects: z.array(projectSchema).default([]),
  contactForm: contactFormSchema.default({
    service: "none",
    endpoint: "",
  }),
  deployment: deploymentSchema.default({
    platform: "none",
    customDomain: "",
  }),
});

// Export individual step schemas for validation
export const stepSchemas = {
  personalInfo: personalInfoSchema,
  skills: skillsSchema,
  experience: experienceSchema,
  projects: projectsSchema,
  finalSetup: finalSetupSchema,
};

// Types derived from schemas
export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type Skills = z.infer<typeof skillsSchema>;
export type WorkExperience = z.infer<typeof workExperienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Projects = z.infer<typeof projectsSchema>;
export type ContactForm = z.infer<typeof contactFormSchema>;
export type Deployment = z.infer<typeof deploymentSchema>;
export type FinalSetup = z.infer<typeof finalSetupSchema>;
export type OnboardingData = z.infer<typeof onboardingSchema>;
