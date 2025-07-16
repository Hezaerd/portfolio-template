"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Eye,
  EyeOff,
  ExternalLink,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useOnboardingContext } from "@/contexts/OnboardingContext";

const steps = [
  {
    step: 1,
    title: "Go to GitHub Settings",
    description: "Navigate to your GitHub account settings",
    action: "Click on your profile picture → Settings",
  },
  {
    step: 2,
    title: "Access Developer Settings",
    description: "Find the developer settings section",
    action: "In the left sidebar, scroll down and click 'Developer settings'",
  },
  {
    step: 3,
    title: "Personal Access Tokens",
    description: "Navigate to token management",
    action: "Click 'Personal access tokens' → 'Tokens (classic)'",
    link: "https://github.com/settings/tokens",
  },
  {
    step: 4,
    title: "Generate New Token",
    description: "Create a new token for your portfolio",
    action: "Click 'Generate new token (classic)'",
  },
  {
    step: 5,
    title: "Configure Token",
    description: "Set up your token with proper permissions",
    action:
      "Give it a name like 'Portfolio Stats' and select 'public_repo' scope",
  },
];

export function GitHubStep() {
  const { nextStep } = useOnboardingContext();
  const [token, setToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validateToken = async (tokenValue: string) => {
    if (!tokenValue.trim()) {
      setIsValid(null);
      return;
    }

    setIsValidating(true);
    try {
      const response = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${tokenValue}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (response.ok) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } catch (_error) {
      setIsValid(false);
    } finally {
      setIsValidating(false);
    }
  };

  const handleTokenChange = (value: string) => {
    setToken(value);
    setIsValid(null);

    // Debounce validation
    const timeoutId = setTimeout(() => {
      validateToken(value);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const handleSave = async () => {
    if (!token.trim()) {
      toast.error("Please enter a GitHub token");
      return;
    }

    if (isValid === false) {
      toast.error("Please enter a valid GitHub token");
      return;
    }

    try {
      const response = await fetch("/api/update-env", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ GITHUB_TOKEN: token }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("GitHub token saved successfully!");
        nextStep();
      } else {
        toast.error(data.error || "Failed to save GitHub token");
      }
    } catch (error) {
      console.error("Error saving GitHub token:", error);
      toast.error("Failed to save GitHub token");
    }
  };

  const handleSkip = async () => {
    try {
      // Update env with empty token to indicate user chose to skip
      await fetch("/api/update-env", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ GITHUB_TOKEN: "" }),
      });
    } catch (error) {
      console.error("Error updating environment:", error);
    }
    nextStep();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <motion.div
          className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Github className="w-8 h-8 text-primary" />
        </motion.div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          GitHub Integration
        </h3>
        <p className="text-muted-foreground">
          Connect your GitHub account to display repository stats and
          contribution activity
        </p>
      </div>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
            What you'll get
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="w-2 h-2 rounded-full p-0" />
              <span className="text-sm">Repository statistics</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="w-2 h-2 rounded-full p-0" />
              <span className="text-sm">Total stars earned</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="w-2 h-2 rounded-full p-0" />
              <span className="text-sm">Contribution heatmap</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="w-2 h-2 rounded-full p-0" />
              <span className="text-sm">Top programming languages</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Setup Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Setup Guide</CardTitle>
          <p className="text-sm text-muted-foreground">
            Follow these steps to create a GitHub Personal Access Token
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                  {step.step}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground">
                    {step.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {step.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <code className="text-xs bg-background px-2 py-1 rounded border font-mono">
                      {step.action}
                    </code>
                    <div className="flex items-center space-x-2">
                      {step.link && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-3 text-xs"
                          onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(
                              step.link,
                              "_blank",
                              "noopener,noreferrer"
                            );
                          }}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Open Page
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Token Input */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="github-token" className="text-sm font-medium">
            GitHub Personal Access Token
          </Label>
          <p className="text-xs text-muted-foreground mb-2">
            Paste your token here (it should start with "ghp_")
          </p>
          <div className="relative">
            <Input
              id="github-token"
              type={showToken ? "text" : "password"}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              value={token}
              onChange={e => handleTokenChange(e.target.value)}
              className={`pr-20 ${
                isValid === true
                  ? "border-green-500 focus:ring-green-500"
                  : isValid === false
                    ? "border-red-500 focus:ring-red-500"
                    : ""
              }`}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
              {isValidating && (
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              )}
              {isValid === true && (
                <CheckCircle className="w-4 h-4 text-green-500" />
              )}
              {isValid === false && (
                <AlertCircle className="w-4 h-4 text-red-500" />
              )}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => setShowToken(!showToken)}
              >
                {showToken ? (
                  <EyeOff className="w-3 h-3" />
                ) : (
                  <Eye className="w-3 h-3" />
                )}
              </Button>
            </div>
          </div>
          {isValid === false && (
            <p className="text-xs text-red-500 mt-1">
              Invalid token. Please check your token and try again.
            </p>
          )}
          {isValid === true && (
            <p className="text-xs text-green-500 mt-1">✓ Valid GitHub token</p>
          )}
        </div>

        <div className="flex justify-between space-x-4">
          <Button variant="outline" onClick={handleSkip} className="flex-1">
            Skip for now
          </Button>
          <Button
            onClick={handleSave}
            disabled={!token.trim() || isValid === false || isValidating}
            className="flex-1"
          >
            {isValidating ? "Validating..." : "Save & Continue"}
          </Button>
        </div>
      </div>

      {/* Security Note */}
      <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
        <CardContent className="p-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                Security Notice
              </p>
              <p className="text-amber-700 dark:text-amber-300">
                Your token is stored locally and only used to fetch public
                repository data. We recommend using a token with minimal
                "public_repo" permissions only.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
