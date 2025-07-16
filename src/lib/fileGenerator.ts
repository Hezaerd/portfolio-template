import { OnboardingData } from "@/hooks/useOnboarding";

export const generatePortfolioFiles = async (data: OnboardingData) => {
  try {
    // Update each data file via API - these will now write to the actual source files
    const updatePromises = [
      // Update personal info
      fetch("/api/data/personal-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personalInfo: data.personalInfo }),
      }),

      // Update skills
      fetch("/api/data/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: data.skills }),
      }),

      // Update experience
      fetch("/api/data/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workExperience: data.workExperience,
          education: data.education,
        }),
      }),

      // Update projects
      fetch("/api/data/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projects: data.projects }),
      }),

      // Update contact config
      fetch("/api/data/contact-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactConfig: data.contactForm }),
      }),

      // Update resume
      fetch("/api/data/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume: data.resume }),
      }),
    ];

    const responses = await Promise.all(updatePromises);

    // Check if all updates succeeded
    const results = await Promise.all(responses.map(r => r.json()));
    const failures = results.filter(r => !r.success);

    if (failures.length > 0) {
      throw new Error(
        `Failed to update: ${failures.map(f => f.error).join(", ")}`
      );
    }

    console.log("✅ All portfolio files updated successfully!");

    // Reload Zustand store from the updated files to ensure consistency
    if (typeof window !== "undefined") {
      const { usePortfolioStore } = await import("../stores/portfolio-store");
      const { reloadFromFiles } = usePortfolioStore.getState();

      // Small delay to ensure file writes are complete
      await new Promise(resolve => setTimeout(resolve, 100));

      // Reload from the newly updated files
      await reloadFromFiles();

      console.log("✅ Zustand store reloaded from updated files");
    }

    return { success: true, message: "Portfolio updated successfully!" };
  } catch (error) {
    console.error("Error updating portfolio files:", error);
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
