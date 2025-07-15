import { NextRequest, NextResponse } from "next/server";
import { writeFileSync } from "fs";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const { personalInfo } = await request.json();

    // Create the TypeScript file content with proper interface
    const fileContent = `export interface PersonalInfo {
  name: string;
  role: string;
  bio: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
  twitter?: string;
  website?: string;
}

export const personalInfo: PersonalInfo = ${JSON.stringify(personalInfo, null, 2)};
`;

    // Write to the actual data file
    const filePath = join(process.cwd(), "src/data/personal-info.ts");
    writeFileSync(filePath, fileContent, "utf8");

    return NextResponse.json({
      success: true,
      message: "Personal info updated successfully",
    });
  } catch (error) {
    console.error("Error updating personal info:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update personal info" },
      { status: 500 }
    );
  }
}
