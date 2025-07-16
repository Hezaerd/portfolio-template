import fs from "node:fs";
import path from "node:path";

const ENV_LOCAL_PATH = path.join(process.cwd(), ".env.local");
const ENV_EXAMPLE_PATH = path.join(process.cwd(), ".env.example");

const ENV_EXAMPLE_CONTENT = `# Portfolio Configuration
# Copy this file to .env.local and fill in your values

# GitHub Integration (Optional)
# To enable GitHub stats section, create a Personal Access Token:
# 1. Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
# 2. Click "Generate new token (classic)"
# 3. Give it a descriptive name like "Portfolio Stats"
# 4. Select expiration (recommend 1 year)
# 5. Select scopes: public_repo (read access to public repositories)
# 6. Click "Generate token" and copy the token
# 7. Paste the token below (starts with ghp_)
GITHUB_TOKEN=

# Contact Form Configuration (Optional)
# Configure your contact form service
# Supported services: emailjs, formspree, netlify, none
CONTACT_SERVICE=none
CONTACT_ENDPOINT=

# Analytics (Optional)
# Add your analytics tracking ID if using Google Analytics
ANALYTICS_ID=
`;

export interface EnvConfig {
  GITHUB_TOKEN?: string;
  CONTACT_SERVICE?: string;
  CONTACT_ENDPOINT?: string;
  ANALYTICS_ID?: string;
}

/**
 * Reads the current .env.local file and parses it
 */
export function readEnvLocal(): EnvConfig {
  try {
    if (!fs.existsSync(ENV_LOCAL_PATH)) {
      return {};
    }

    const content = fs.readFileSync(ENV_LOCAL_PATH, "utf-8");
    const config: EnvConfig = {};

    content.split("\n").forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const [key, ...valueParts] = trimmed.split("=");
        if (key && valueParts.length > 0) {
          const value = valueParts.join("=").trim();
          if (value) {
            (config as any)[key] = value;
          }
        }
      }
    });

    return config;
  } catch (error) {
    console.error("Error reading .env.local:", error);
    return {};
  }
}

/**
 * Updates or creates .env.local file with new configuration
 */
export function updateEnvLocal(newConfig: Partial<EnvConfig>): boolean {
  try {
    let existingConfig: EnvConfig = {};
    let existingContent = "";

    if (fs.existsSync(ENV_LOCAL_PATH)) {
      existingContent = fs.readFileSync(ENV_LOCAL_PATH, "utf-8");
      existingConfig = readEnvLocal();
    } else {
      // Create from example if .env.local doesn't exist
      existingContent = ENV_EXAMPLE_CONTENT;
    }

    // Merge configurations
    const mergedConfig = { ...existingConfig, ...newConfig };

    // Update the content
    let updatedContent = existingContent;

    Object.entries(mergedConfig).forEach(([key, value]) => {
      const regex = new RegExp(`^${key}=.*$`, "m");
      const newLine = `${key}=${value || ""}`;

      if (regex.test(updatedContent)) {
        updatedContent = updatedContent.replace(regex, newLine);
      } else {
        // Add new line if key doesn't exist
        updatedContent += `\n${newLine}`;
      }
    });

    fs.writeFileSync(ENV_LOCAL_PATH, updatedContent);
    return true;
  } catch (error) {
    console.error("Error updating .env.local:", error);
    return false;
  }
}

/**
 * Creates .env.example file if it doesn't exist
 */
export function ensureEnvExample(): boolean {
  try {
    if (!fs.existsSync(ENV_EXAMPLE_PATH)) {
      fs.writeFileSync(ENV_EXAMPLE_PATH, ENV_EXAMPLE_CONTENT);
    }
    return true;
  } catch (error) {
    console.error("Error creating .env.example:", error);
    return false;
  }
}

/**
 * Gets GitHub token from environment
 */
export function getGitHubToken(): string | null {
  return process.env.GITHUB_TOKEN || null;
}

/**
 * Checks if GitHub integration is enabled
 */
export function isGitHubEnabled(): boolean {
  return Boolean(getGitHubToken());
}
