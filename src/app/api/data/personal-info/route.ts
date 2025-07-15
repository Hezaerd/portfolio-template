import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import { join } from "path";
import { PersonalInfo } from "@/lib/validationSchemas";

const DATA_DIR = join(process.cwd(), "src", "data");
const PERSONAL_INFO_FILE = join(DATA_DIR, "personal-info.ts");

// Default personal info
const defaultPersonalInfo: PersonalInfo = {
  name: "Your Name",
  role: "Game/Engine Programmer",
  bio: "Passionate about building high-performance game engines, tools, and interactive experiences. Specialized in C++, C#, and real-time graphics.",
  email: "your.email@example.com",
  location: "",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  twitter: "https://twitter.com/yourusername",
  website: "",
};

export async function GET() {
  try {
    // Try to read existing personal info file
    try {
      const fileContent = await readFile(PERSONAL_INFO_FILE, "utf-8");
      // Extract the personalInfo object from the file
      const match = fileContent.match(
        /export const personalInfo[^=]*=\s*({[\s\S]*?});/
      );
      if (match) {
        // Parse the object (this is a simple approach, in production you might want more robust parsing)
        const personalInfoStr = match[1];
        const personalInfo = eval(`(${personalInfoStr})`);
        return NextResponse.json({ personalInfo, success: true });
      }
    } catch (error) {
      // File doesn't exist, return default
      console.log("Personal info file not found, returning default");
    }

    return NextResponse.json({
      personalInfo: defaultPersonalInfo,
      success: true,
    });
  } catch (error) {
    console.error("Error reading personal info:", error);
    return NextResponse.json(
      { error: "Failed to read personal info", success: false },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { personalInfo }: { personalInfo: PersonalInfo } =
      await request.json();

    // Ensure data directory exists
    await mkdir(DATA_DIR, { recursive: true });

    // Generate the TypeScript file content
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

export const personalInfo: PersonalInfo = {
  name: ${JSON.stringify(personalInfo.name)},
  role: ${JSON.stringify(personalInfo.role)},
  bio: ${JSON.stringify(personalInfo.bio)},
  email: ${JSON.stringify(personalInfo.email)},
  location: ${JSON.stringify(personalInfo.location)},
  github: ${JSON.stringify(personalInfo.github)},
  linkedin: ${JSON.stringify(personalInfo.linkedin)},
  twitter: ${JSON.stringify(personalInfo.twitter || "")},
  website: ${JSON.stringify(personalInfo.website || "")},
};
`;

    // Write the file
    await writeFile(PERSONAL_INFO_FILE, fileContent, "utf-8");

    console.log("✅ Personal info updated successfully");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating personal info:", error);
    return NextResponse.json(
      { error: "Failed to update personal info", success: false },
      { status: 500 }
    );
  }
}
