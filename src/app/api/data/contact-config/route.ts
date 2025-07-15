import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import { join } from "path";
import { ContactForm } from "@/lib/validationSchemas";

const DATA_DIR = join(process.cwd(), "src", "data");
const CONTACT_CONFIG_FILE = join(DATA_DIR, "contact-config.ts");

// Default contact config
const defaultContactConfig: ContactForm = {
  service: "none",
  endpoint: "",
};

export async function GET() {
  try {
    // Try to read existing contact config file
    try {
      const fileContent = await readFile(CONTACT_CONFIG_FILE, "utf-8");
      // Extract the contactConfig object from the file
      const match = fileContent.match(
        /export const contactConfig[^=]*=\s*({[\s\S]*?});/
      );
      if (match) {
        const contactConfigStr = match[1];
        const contactConfig = eval(`(${contactConfigStr})`);
        return NextResponse.json({ contactConfig, success: true });
      }
    } catch (error) {
      // File doesn't exist, return default
      console.log("Contact config file not found, returning default");
    }

    return NextResponse.json({
      contactConfig: defaultContactConfig,
      success: true,
    });
  } catch (error) {
    console.error("Error reading contact config:", error);
    return NextResponse.json(
      { error: "Failed to read contact config", success: false },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { contactConfig }: { contactConfig: ContactForm } =
      await request.json();

    // Ensure data directory exists
    await mkdir(DATA_DIR, { recursive: true });

    // Generate the TypeScript file content
    const fileContent = `export interface ContactConfig {
  service: "formspree" | "netlify" | "custom" | "none";
  endpoint?: string;
}

export const contactConfig: ContactConfig = {
  service: ${JSON.stringify(contactConfig.service)},
  endpoint: ${JSON.stringify(contactConfig.endpoint || "")},
};
`;

    // Write the file
    await writeFile(CONTACT_CONFIG_FILE, fileContent, "utf-8");

    console.log("✅ Contact config updated successfully");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating contact config:", error);
    return NextResponse.json(
      { error: "Failed to update contact config", success: false },
      { status: 500 }
    );
  }
}
