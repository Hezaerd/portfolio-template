"use client";

import { useState, useEffect } from "react";
import { GitHubStatsSection } from "@/components/sections/github-stats";

export function ConditionalGitHubStats() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkGitHubStatus = async () => {
      try {
        const response = await fetch("/api/github-enabled");
        const data = await response.json();
        setIsEnabled(data.enabled);
      } catch (error) {
        console.error("Failed to check GitHub status:", error);
        setIsEnabled(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkGitHubStatus();
  }, []);

  if (isLoading) {
    return null; // Don't render anything while checking
  }

  if (!isEnabled) {
    return null; // Don't render if GitHub is not enabled
  }

  return <GitHubStatsSection />;
}
