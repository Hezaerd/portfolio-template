import { OnboardingData } from "@/hooks/useOnboarding";

export const generatePortfolioFiles = async (data: OnboardingData) => {
  try {
    // Since we don't have API endpoints, we'll update the Zustand store directly
    // and store the data in localStorage for persistence

    // Store individual data pieces in localStorage for potential file generation
    const dataFiles = {
      personalInfo: data.personalInfo,
      skills: data.skills,
      workExperience: data.workExperience,
      education: data.education,
      projects: data.projects,
      contactConfig: data.contactForm,
    };

    // Store each data type individually
    localStorage.setItem(
      "portfolio-personal-info",
      JSON.stringify(data.personalInfo)
    );
    localStorage.setItem("portfolio-skills", JSON.stringify(data.skills));
    localStorage.setItem(
      "portfolio-work-experience",
      JSON.stringify(data.workExperience)
    );
    localStorage.setItem("portfolio-education", JSON.stringify(data.education));
    localStorage.setItem("portfolio-projects", JSON.stringify(data.projects));
    localStorage.setItem(
      "portfolio-contact-config",
      JSON.stringify(data.contactForm)
    );

    // Create file objects for potential download
    const generatedFiles = [
      {
        filename: "personal-info.ts",
        content: `export const personalInfo = ${JSON.stringify(data.personalInfo, null, 2)};`,
      },
      {
        filename: "skills.ts",
        content: `export const skills = ${JSON.stringify(data.skills, null, 2)};`,
      },
      {
        filename: "experience.ts",
        content: `export const workExperience = ${JSON.stringify(data.workExperience, null, 2)};\n\nexport const education = ${JSON.stringify(data.education, null, 2)};`,
      },
      {
        filename: "projects.ts",
        content: `export const projects = ${JSON.stringify(data.projects, null, 2)};`,
      },
      {
        filename: "contact-config.ts",
        content: `export const contactConfig = ${JSON.stringify(data.contactForm, null, 2)};`,
      },
    ];

    // Store generated files for potential download
    localStorage.setItem(
      "portfolio-generated-files",
      JSON.stringify(generatedFiles)
    );

    console.log("✅ Portfolio data updated successfully!");

    // Update Zustand store immediately for real-time updates
    if (typeof window !== "undefined") {
      const { usePortfolioStore } = await import("../stores/portfolio-store");
      const { updateAllData } = usePortfolioStore.getState();
      updateAllData({
        personalInfo: data.personalInfo,
        skills: data.skills,
        workExperience: data.workExperience,
        education: data.education,
        projects: data.projects,
        contactConfig: data.contactForm,
      });

      console.log("✅ Zustand store updated with new data");
    }

    return { success: true, message: "Portfolio updated successfully!" };
  } catch (error) {
    console.error("Error updating portfolio data:", error);
    throw error;
  }
};

// Function to create download links for generated files
export const createDownloadLinks = (
  files: { filename: string; content: string }[]
) => {
  const links = files.map(file => {
    const blob = new Blob([file.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    return {
      filename: file.filename,
      url,
      download: () => {
        const link = document.createElement("a");
        link.href = url;
        link.download = file.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      },
    };
  });

  return links;
};

// Function to apply updates to components (this would be used in a real implementation)
export const applyPersonalInfoUpdates = (
  personalInfo: OnboardingData["personalInfo"]
) => {
  // This would update the actual component files
  // For now, we'll just store the updates
  localStorage.setItem("portfolio-personal-info", JSON.stringify(personalInfo));
  return personalInfo;
};

// Function to generate a complete setup summary
export const generateSetupSummary = (data: OnboardingData) => {
  const summary = {
    personalInfo: {
      name: data.personalInfo.name,
      role: data.personalInfo.role,
      email: data.personalInfo.email,
      socialLinks: {
        github: data.personalInfo.github,
        linkedin: data.personalInfo.linkedin,
        twitter: data.personalInfo.twitter,
        website: data.personalInfo.website,
      },
    },
    content: {
      skills: data.skills.length,
      workExperience: data.workExperience.length,
      education: data.education.length,
      projects: data.projects.length,
    },
    configuration: {
      contactForm: data.contactForm.service,
      deployment: data.deployment.platform,
    },
    nextSteps: [
      "Review generated files in browser console",
      "Apply personal information updates to components",
      "Configure contact form endpoint if needed",
      "Set up deployment platform",
      "Customize colors with TweakCN",
      "Test and deploy your portfolio",
    ],
  };

  return summary;
};
