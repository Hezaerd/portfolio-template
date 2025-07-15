import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  try {
    const filePath = join(process.cwd(), "src", "data", "projects.ts");
    const content = await readFile(filePath, "utf-8");

    // Extract projects array from TypeScript file
    const projectsMatch = content.match(
      /export const projects: Project\[\] = \[([\s\S]*?)\];/
    );
    if (!projectsMatch) {
      return NextResponse.json(
        { error: "Invalid projects file format" },
        { status: 500 }
      );
    }

    const projectsString = projectsMatch[1];
    const projects = parseProjectsArray(projectsString);

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Error reading projects:", error);
    return NextResponse.json(
      { error: "Failed to read projects" },
      { status: 500 }
    );
  }
}

function parseProjectsArray(content: string) {
  const projects = [];
  const objectRegex = /\{([\s\S]*?)\}/g;
  let match;

  while ((match = objectRegex.exec(content)) !== null) {
    const obj = match[1];
    const project = {
      title: extractValue(obj, "title"),
      description: extractValue(obj, "description"),
      longDescription: extractValue(obj, "longDescription"),
      highlight: extractValue(obj, "highlight"),
      tags: extractArray(obj, "tags"),
      features: extractArray(obj, "features"),
      challenges: extractArray(obj, "challenges"),
      technologies: extractArray(obj, "technologies"),
      githubUrl: extractValue(obj, "githubUrl"),
      liveUrl: extractValue(obj, "liveUrl"),
      duration: extractValue(obj, "duration"),
      teamSize: extractValue(obj, "teamSize"),
      role: extractValue(obj, "role"),
    };

    // Remove empty fields
    Object.keys(project).forEach(key => {
      const value = (project as any)[key];
      if (value === "" || (Array.isArray(value) && value.length === 0)) {
        delete (project as any)[key];
      }
    });

    projects.push(project);
  }

  return projects;
}

function extractValue(obj: string, key: string): string {
  const regex = new RegExp(`${key}:\\s*["'\`]([^"'\`]+)["'\`]`);
  const match = obj.match(regex);
  return match ? match[1] : "";
}

function extractArray(obj: string, key: string): string[] {
  const regex = new RegExp(`${key}:\\s*\\[([^\\]]+)\\]`);
  const match = obj.match(regex);
  if (!match) return [];

  return match[1]
    .split(",")
    .map(item => item.trim().replace(/['"]/g, ""))
    .filter(item => item.length > 0);
}

export async function POST(request: NextRequest) {
  try {
    const { projects } = await request.json();

    const content = `export interface Project {
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

export const projects: Project[] = [
${projects
  .map(
    (project: any) => `  {
    title: "${project.title}",
    description: "${project.description}",
    tags: [${project.tags.map((tag: string) => `"${tag}"`).join(", ")}],${project.highlight ? `\n    highlight: "${project.highlight}",` : ""}${project.longDescription ? `\n    longDescription: \`${project.longDescription}\`,` : ""}${project.features && project.features.length > 0 ? `\n    features: [\n${project.features.map((f: string) => `      "${f}",`).join("\n")}\n    ],` : ""}${project.challenges && project.challenges.length > 0 ? `\n    challenges: [\n${project.challenges.map((c: string) => `      "${c}",`).join("\n")}\n    ],` : ""}${project.technologies && project.technologies.length > 0 ? `\n    technologies: [\n${project.technologies.map((t: string) => `      "${t}",`).join("\n")}\n    ],` : ""}${project.githubUrl ? `\n    githubUrl: "${project.githubUrl}",` : ""}${project.liveUrl ? `\n    liveUrl: "${project.liveUrl}",` : ""}${project.duration ? `\n    duration: "${project.duration}",` : ""}${project.teamSize ? `\n    teamSize: "${project.teamSize}",` : ""}${project.role ? `\n    role: "${project.role}",` : ""}
  },`
  )
  .join("\n")}
];
`;

    const filePath = join(process.cwd(), "src", "data", "projects.ts");
    await writeFile(filePath, content);

    return NextResponse.json({
      success: true,
      message: "Projects updated successfully",
    });
  } catch (error) {
    console.error("Error updating projects:", error);
    return NextResponse.json(
      { error: "Failed to update projects" },
      { status: 500 }
    );
  }
}
