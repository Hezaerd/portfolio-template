import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  try {
    const filePath = join(process.cwd(), "src", "data", "skills.ts");
    const content = await readFile(filePath, "utf-8");

    // Extract skills array from TypeScript file
    const skillsMatch = content.match(/export const skills = \[([\s\S]*?)\];/);
    if (!skillsMatch) {
      return NextResponse.json(
        { error: "Invalid skills file format" },
        { status: 500 }
      );
    }

    const skillsString = skillsMatch[1];
    const skills = skillsString
      .split(",")
      .map(skill => skill.trim().replace(/['"]/g, ""))
      .filter(skill => skill.length > 0);

    return NextResponse.json({ skills });
  } catch (error) {
    console.error("Error reading skills:", error);
    return NextResponse.json(
      { error: "Failed to read skills" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { skills } = await request.json();

    const content = `export const skills = [
${skills.map((skill: string) => `  "${skill}",`).join("\n")}
];
`;

    const filePath = join(process.cwd(), "src", "data", "skills.ts");
    await writeFile(filePath, content);

    return NextResponse.json({
      success: true,
      message: "Skills updated successfully",
    });
  } catch (error) {
    console.error("Error updating skills:", error);
    return NextResponse.json(
      { error: "Failed to update skills" },
      { status: 500 }
    );
  }
}
