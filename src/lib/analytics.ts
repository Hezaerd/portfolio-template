"use client";

import { analyticsConfig } from "./settings";

// Global gtag function declaration
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

// Check if analytics is available and enabled
const isAnalyticsAvailable = () => {
  return (
    typeof window !== "undefined" &&
    typeof window.gtag === "function" &&
    analyticsConfig.enabled
  );
};

// Base event tracking function
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (!isAnalyticsAvailable()) {
    // Log in development for debugging
    if (process.env.NODE_ENV === "development") {
      console.log("Analytics Event:", { action, category, label, value });
    }
    return;
  }

  window.gtag!("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Portfolio-specific tracking functions
export const trackProjectView = (projectTitle: string) => {
  trackEvent("view_project", "portfolio", projectTitle);
};

export const trackProjectModalOpen = (projectTitle: string) => {
  trackEvent("open_project_modal", "engagement", projectTitle);
};

export const trackProjectLink = (
  projectTitle: string,
  linkType: "github" | "live"
) => {
  trackEvent("click_project_link", "outbound", `${projectTitle} - ${linkType}`);
};

export const trackContactForm = (method: "submit" | "error") => {
  trackEvent(`contact_form_${method}`, "contact");
};

export const trackResumeDownload = () => {
  trackEvent("download_resume", "engagement");
};

export const trackSocialClick = (platform: string) => {
  trackEvent("click_social", "engagement", platform);
};

export const trackNavigation = (section: string) => {
  trackEvent("navigate_to_section", "navigation", section);
};

export const trackThemeChange = (theme: "light" | "dark" | "system") => {
  trackEvent("change_theme", "preferences", theme);
};

export const trackSearchUsage = (query: string) => {
  trackEvent("search_projects", "search", query);
};

export const trackSkillHover = (skill: string) => {
  trackEvent("hover_skill", "engagement", skill);
};

// Custom page view tracking (for SPA navigation)
export const trackPageView = (path: string, title?: string) => {
  if (!isAnalyticsAvailable()) {
    return;
  }

  window.gtag!("config", analyticsConfig.gaId, {
    page_path: path,
    page_title: title,
  });
};

// Performance tracking
export const trackPerformance = (name: string, value: number) => {
  if (!isAnalyticsAvailable()) {
    return;
  }

  window.gtag!("event", "timing_complete", {
    name: name,
    value: Math.round(value),
  });
};

// Error tracking
export const trackError = (error: string, fatal: boolean = false) => {
  if (!isAnalyticsAvailable()) {
    console.error("Tracked Error:", error);
    return;
  }

  window.gtag!("event", "exception", {
    description: error,
    fatal: fatal,
  });
};

// User engagement tracking
export const trackEngagement = (action: string, details?: string) => {
  trackEvent(
    "user_engagement",
    "interaction",
    `${action}${details ? ` - ${details}` : ""}`
  );
};

// Conversion tracking (if applicable)
export const trackConversion = (action: string, value?: number) => {
  trackEvent("conversion", "goal", action, value);
};
