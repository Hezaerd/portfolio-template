export interface Project {
  title: string;
  description: string;
  tags: string[];
  highlight?: string;
}

export const projects: Project[] = [
  {
    title: "Custom Game Engine",
    description:
      "A 3D game engine built from scratch in C++ and OpenGL, featuring a real-time renderer, physics, and editor tools.",
    tags: ["C++", "OpenGL", "Engine"],
    highlight: "Custom Game Engine",
  },
  {
    title: "Physics Sandbox",
    description:
      "An interactive physics simulation tool for rapid prototyping and educational demos. Built with C# and Unity.",
    tags: ["C#", "Unity", "Physics"],
    highlight: "Physics Sandbox",
  },
  {
    title: "Platformer Game",
    description:
      "A 2D platformer built in Unity, featuring a custom level editor and advanced character controller.",
    tags: ["Unity", "C#", "Level Editor"],
    highlight: "Platformer Game",
  },
  {
    title: "Rendering Demo",
    description:
      "Real-time rendering demo using DirectX 12, showcasing physically based rendering and post-processing effects.",
    tags: ["DirectX 12", "C++", "Rendering"],
    highlight: "Rendering Demo",
  },
  {
    title: "AI Pathfinding Toolkit",
    description:
      "Modular toolkit for A* and navigation mesh pathfinding, designed for easy integration into custom engines and Unity projects.",
    tags: ["C#", "Unity", "AI"],
    highlight: "AI Pathfinding Toolkit",
  },
  {
    title: "Tools Development",
    description:
      "Custom tools for asset pipeline automation, level design, and debugging, improving workflow efficiency for game teams.",
    tags: ["C#", "Unity", "Tools"],
    highlight: "Tools Development",
  },
];
