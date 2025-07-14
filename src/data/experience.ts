export interface Experience {
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
  {
    title: "Senior Game Engine Developer",
    company: "TechCorp Studios",
    period: "2022 - Present",
    description:
      "Led the development of a custom 3D engine and tools for a cross-platform game project.",
    color: "primary",
  },
  {
    title: "Gameplay Programmer",
    company: "GameDev Solutions",
    period: "2020 - 2022",
    description:
      "Implemented core gameplay systems and optimized performance for shipped titles.",
    color: "accent",
  },
];

export const education: Education[] = [
  {
    degree: "B.Sc. in Computer Science",
    school: "State University",
    period: "2016 - 2020",
    description:
      "Specialized in graphics programming, algorithms, and software engineering.",
  },
];
