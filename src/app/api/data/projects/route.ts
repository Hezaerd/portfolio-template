import { NextRequest, NextResponse } from "next/server";
import { writeFileSync } from "fs";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const { projects } = await request.json();

    // Create the TypeScript file content with proper types
    const fileContent = `export interface Project {
  title: string;
  description: string;
  tags: string[];
  highlight?: string;
  longDescription?: string;
  features?: string[];
  challenges?: string[];
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  duration?: string;
  teamSize?: string;
  role?: string;
}

export const projects: Project[] = ${JSON.stringify(projects, null, 2)};
`;

    // Write to the actual data file
    const filePath = join(process.cwd(), "src/data/projects.ts");
    writeFileSync(filePath, fileContent, "utf8");

    return NextResponse.json({
      success: true,
      message: "Projects updated successfully",
    });
  } catch (error) {
    console.error("Error updating projects:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update projects" },
      { status: 500 }
    );
  }
}
