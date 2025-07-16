"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CommitGraph } from "@/components/github/CommitGraph";
import { GitHubStatsDisplay } from "@/components/github/GitHubStatsDisplay";
import type { GitHubStats, GitHubStatsResponse } from "@/types/github";

export function GitHubStatsSection() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);

  const fetchGitHubStats = async (isRetry = false) => {
    try {
      if (isRetry) {
        setRetrying(true);
        setError(null);
      } else {
        setLoading(true);
      }

      const response = await fetch("/api/github-stats", {
        cache: "no-store", // Always fetch fresh data
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GitHubStatsResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to fetch GitHub stats");
      }

      if (data.data) {
        setStats(data.data);
        setError(null);
      }
    } catch (err) {
      console.error("Failed to fetch GitHub stats:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch GitHub stats"
      );
      setStats(null);
    } finally {
      setLoading(false);
      setRetrying(false);
    }
  };

  useEffect(() => {
    fetchGitHubStats();
  }, []);

  const handleRetry = () => {
    fetchGitHubStats(true);
  };

  if (loading) {
    return (
      <section
        id="github-stats"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-background"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12 flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Github className="w-7 h-7 text-primary" /> GitHub Stats
          </motion.h2>

          <Card>
            <CardContent className="p-16 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">
                Loading GitHub statistics...
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="github-stats"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-background"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12 flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Github className="w-7 h-7 text-primary" /> GitHub Stats
          </motion.h2>

          <Card>
            <CardContent className="p-16 text-center">
              <AlertCircle className="w-8 h-8 mx-auto mb-4 text-destructive" />
              <h3 className="text-lg font-semibold mb-2">
                Failed to Load GitHub Stats
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {error.includes("token")
                  ? "GitHub token not configured. Please add your GitHub token in the onboarding settings."
                  : `Error: ${error}`}
              </p>
              <Button
                onClick={handleRetry}
                disabled={retrying}
                variant="outline"
                className="min-w-[120px]"
              >
                {retrying ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Retrying...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <section
      id="github-stats"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Github className="w-7 h-7 text-primary" /> GitHub Stats
        </motion.h2>

        <div className="space-y-8">
          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <GitHubStatsDisplay stats={stats} />
          </motion.div>

          {/* Contribution Graph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6 flex items-center">
                  <Github className="w-5 h-5 mr-2" />
                  Contribution Activity
                </h3>
                <CommitGraph contributions={stats.contributions} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Last Updated */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date(stats.lastUpdated).toLocaleString()}
            </p>
            <Button
              onClick={handleRetry}
              disabled={retrying}
              variant="ghost"
              size="sm"
              className="mt-2"
            >
              {retrying ? (
                <>
                  <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <RefreshCw className="w-3 h-3 mr-2" />
                  Refresh Data
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
