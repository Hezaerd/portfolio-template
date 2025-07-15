import { z } from "zod";

// Define the schema for environment variables
const envSchema = z.object({
  // Google Analytics
  NEXT_PUBLIC_GA_ID: z.string().min(1, "Google Analytics ID is required"),

  // App Configuration
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url({ message: "Invalid site URL" })
    .default("http://localhost:3000"),

  // Optional: Node environment
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

// Type for the validated environment
export type Environment = z.infer<typeof envSchema>;

// Function to validate and get environment variables
function getEnvironment(): Environment {
  const env = {
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NODE_ENV: process.env.NODE_ENV,
  };

  try {
    return envSchema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues.map(
        (issue: z.ZodIssue) => `${issue.path.join(".")}: ${issue.message}`
      );
      throw new Error(
        `Environment validation failed:\n${errorMessages.join("\n")}`
      );
    }
    throw error;
  }
}

// Export the validated environment
export const env = getEnvironment();

// Helper functions for specific configurations
export const isDevelopment = env.NODE_ENV === "development";
export const isProduction = env.NODE_ENV === "production";
export const isTest = env.NODE_ENV === "test";

// Analytics configuration
export const analyticsConfig = {
  gaId: env.NEXT_PUBLIC_GA_ID,
  enabled: isProduction, // Only enable in production
} as const;

// Site configuration
export const siteConfig = {
  url: env.NEXT_PUBLIC_SITE_URL,
} as const;
