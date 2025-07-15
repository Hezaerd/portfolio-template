import { NextRequest, NextResponse } from "next/server";
import { writeFileSync } from "fs";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const { skills } = await request.json();

    // Create the TypeScript file content
    const fileContent = `export const skills: string[] = ${JSON.stringify(skills, null, 2)};
`;

    // Write to the actual data file
    const filePath = join(process.cwd(), "src/data/skills.ts");
    writeFileSync(filePath, fileContent, "utf8");

    return NextResponse.json({
      success: true,
      message: "Skills updated successfully",
    });
  } catch (error) {
    console.error("Error updating skills:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update skills" },
      { status: 500 }
    );
  }
}
