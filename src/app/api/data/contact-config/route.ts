import { NextRequest, NextResponse } from "next/server";
import { writeFileSync } from "fs";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const { contactConfig } = await request.json();

    // Create the TypeScript file content with proper types
    const fileContent = `export interface ContactConfig {
  service: "formspree" | "netlify" | "custom" | "none";
  endpoint?: string;
}

export const contactConfig: ContactConfig = ${JSON.stringify(contactConfig, null, 2)};
`;

    // Write to the actual data file
    const filePath = join(process.cwd(), "src/data/contact-config.ts");
    writeFileSync(filePath, fileContent, "utf8");

    return NextResponse.json({
      success: true,
      message: "Contact config updated successfully",
    });
  } catch (error) {
    console.error("Error updating contact config:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update contact config" },
      { status: 500 }
    );
  }
}
