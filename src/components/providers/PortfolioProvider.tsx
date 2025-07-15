"use client";

import { useEffect, ReactNode } from "react";
import { usePortfolioStore } from "../../stores/portfolio-store";

interface PortfolioProviderProps {
  children: ReactNode;
}

export const PortfolioProvider = ({ children }: PortfolioProviderProps) => {
  const { loadInitialData, isLoaded } = usePortfolioStore();

  useEffect(() => {
    if (!isLoaded) {
      loadInitialData();
    }
  }, [loadInitialData, isLoaded]);

  return <>{children}</>;
};
