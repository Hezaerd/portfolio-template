import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const { resume } = await import("../../../../data/resume");
    return NextResponse.json(resume);
  } catch (error) {
    console.error("Error loading resume data:", error);
    return NextResponse.json(
      { fileName: "", originalName: "", size: 0 },
      { status: 200 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { resume } = await request.json();

    if (!resume) {
      return NextResponse.json(
        { success: false, error: "Resume data is required" },
        { status: 400 }
      );
    }

    // Generate the updated resume data file
    const resumeFileContent = `export interface Resume {
  fileName: string; // e.g., "resume.pdf"
  originalName: string; // Original file name from user
  size: number;
}

export const resume: Resume = ${JSON.stringify(resume, null, 2)};`;

    // Write to the data file
    const filePath = path.join(process.cwd(), "src", "data", "resume.ts");
    await writeFile(filePath, resumeFileContent, "utf8");

    console.log("✅ Resume data updated successfully");

    return NextResponse.json({
      success: true,
      message: "Resume data updated successfully",
    });
  } catch (error) {
    console.error("Error updating resume data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update resume data" },
      { status: 500 }
    );
  }
}
