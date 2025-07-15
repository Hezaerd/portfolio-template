import { NextRequest, NextResponse } from "next/server";
import { writeFileSync } from "fs";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const { workExperience, education } = await request.json();

    // Create the TypeScript file content with proper types
    const fileContent = `export interface WorkExperience {
  title: string;
  company: string;
  period: string;
  description: string;
  color: "primary" | "accent";
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  description: string;
}

export const workExperience: WorkExperience[] = ${JSON.stringify(workExperience, null, 2)};

export const education: Education[] = ${JSON.stringify(education, null, 2)};
`;

    // Write to the actual data file
    const filePath = join(process.cwd(), "src/data/experience.ts");
    writeFileSync(filePath, fileContent, "utf8");

    return NextResponse.json({
      success: true,
      message: "Experience updated successfully",
    });
  } catch (error) {
    console.error("Error updating experience:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update experience" },
      { status: 500 }
    );
  }
}
