import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  try {
    const filePath = join(process.cwd(), "src", "data", "experience.ts");
    const content = await readFile(filePath, "utf-8");

    // Extract work experience array from TypeScript file
    const workExperienceMatch = content.match(
      /export const workExperience: Experience\[\] = \[([\s\S]*?)\];/
    );
    const educationMatch = content.match(
      /export const education: Education\[\] = \[([\s\S]*?)\];/
    );

    if (!workExperienceMatch || !educationMatch) {
      return NextResponse.json(
        { error: "Invalid experience file format" },
        { status: 500 }
      );
    }

    // Parse work experience
    const workExperienceString = workExperienceMatch[1];
    const workExperience = parseExperienceArray(workExperienceString);

    // Parse education
    const educationString = educationMatch[1];
    const education = parseEducationArray(educationString);

    return NextResponse.json({ workExperience, education });
  } catch (error) {
    console.error("Error reading experience:", error);
    return NextResponse.json(
      { error: "Failed to read experience" },
      { status: 500 }
    );
  }
}

function parseExperienceArray(content: string) {
  const experiences = [];
  const objectRegex = /\{([\s\S]*?)\}/g;
  let match;

  while ((match = objectRegex.exec(content)) !== null) {
    const obj = match[1];
    const experience = {
      title: extractValue(obj, "title"),
      company: extractValue(obj, "company"),
      period: extractValue(obj, "period"),
      description: extractValue(obj, "description"),
      color: extractValue(obj, "color") as "primary" | "accent",
    };
    experiences.push(experience);
  }

  return experiences;
}

function parseEducationArray(content: string) {
  const educationItems = [];
  const objectRegex = /\{([\s\S]*?)\}/g;
  let match;

  while ((match = objectRegex.exec(content)) !== null) {
    const obj = match[1];
    const education = {
      degree: extractValue(obj, "degree"),
      school: extractValue(obj, "school"),
      period: extractValue(obj, "period"),
      description: extractValue(obj, "description"),
    };
    educationItems.push(education);
  }

  return educationItems;
}

function extractValue(obj: string, key: string): string {
  const regex = new RegExp(`${key}:\\s*["']([^"']+)["']`);
  const match = obj.match(regex);
  return match ? match[1] : "";
}

export async function POST(request: NextRequest) {
  try {
    const { workExperience, education } = await request.json();

    const content = `export interface Experience {
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

export const workExperience: Experience[] = [
${workExperience
  .map(
    (work: any) => `  {
    title: "${work.title}",
    company: "${work.company}",
    period: "${work.period}",
    description: "${work.description}",
    color: "${work.color}",
  },`
  )
  .join("\n")}
];

export const education: Education[] = [
${education
  .map(
    (edu: any) => `  {
    degree: "${edu.degree}",
    school: "${edu.school}",
    period: "${edu.period}",
    description: "${edu.description}",
  },`
  )
  .join("\n")}
];
`;

    const filePath = join(process.cwd(), "src", "data", "experience.ts");
    await writeFile(filePath, content);

    return NextResponse.json({
      success: true,
      message: "Experience updated successfully",
    });
  } catch (error) {
    console.error("Error updating experience:", error);
    return NextResponse.json(
      { error: "Failed to update experience" },
      { status: 500 }
    );
  }
}
