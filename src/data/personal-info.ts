export interface PersonalInfo {
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
  name: "Your Name",
  role: "Game/Engine Programmer",
  bio: "Passionate about building high-performance game engines, tools, and interactive experiences. Specialized in C++, C#, and real-time graphics.",
  email: "your.email@example.com",
  location: "",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  twitter: "",
  website: "",
};
