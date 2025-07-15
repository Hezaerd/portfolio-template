"use client";

import { useState, useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import { useOnboardingContext } from "@/contexts/OnboardingContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Plus, X, Code, Zap } from "lucide-react";

const skillSuggestions = [
  // Programming Languages
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
  // Game Development
  "Unity",
  "Unreal Engine",
  "Godot",
  "GameMaker Studio",
  "Blender",
  "Maya",
  "3ds Max",
  // Web Development
  "React",
  "Vue.js",
  "Angular",
  "Node.js",
  "Express.js",
  "Next.js",
  "Nuxt.js",
  "Svelte",
  // Mobile Development
  "React Native",
  "Flutter",
  "Xamarin",
  "Ionic",
  "Cordova",
  // Graphics & Rendering
  "OpenGL",
  "DirectX",
  "Vulkan",
  "Metal",
  "WebGL",
  "Shader Programming",
  "HLSL",
  "GLSL",
  // Game Engines & Tools
  "Unity Engine",
  "Unreal Engine 4",
  "Unreal Engine 5",
  "CryEngine",
  "Godot Engine",
  // Databases
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "SQLite",
  "Redis",
  "Firebase",
  // Cloud & DevOps
  "AWS",
  "Azure",
  "Google Cloud",
  "Docker",
  "Kubernetes",
  "CI/CD",
  "Git",
  "GitHub Actions",
  // AI & ML
  "Machine Learning",
  "TensorFlow",
  "PyTorch",
  "Computer Vision",
  "Natural Language Processing",
  // Other
  "Game Design",
  "Level Design",
  "UI/UX Design",
  "Project Management",
  "Agile",
  "Scrum",
];

export const SkillsStep = () => {
  const { form } = useOnboardingContext();
  const [newSkill, setNewSkill] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const skills = form.watch("skills");

  useEffect(() => {
    if (newSkill) {
      const filtered = skillSuggestions.filter(
        suggestion =>
          suggestion.toLowerCase().includes(newSkill.toLowerCase()) &&
          !skills.includes(suggestion)
      );
      setFilteredSuggestions(filtered.slice(0, 8));
    } else {
      setFilteredSuggestions([]);
    }
  }, [newSkill, skills]);

  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      const currentSkills = form.getValues("skills");
      form.setValue("skills", [...currentSkills, skill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const currentSkills = form.getValues("skills");
    form.setValue(
      "skills",
      currentSkills.filter(skill => skill !== skillToRemove)
    );
  };

  const handleAddSkill = () => {
    addSkill(newSkill);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const addPopularSkills = () => {
    const popularSkills = [
      "JavaScript",
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "Git",
    ];
    const currentSkills = form.getValues("skills");
    const newSkills = popularSkills.filter(
      skill => !currentSkills.includes(skill)
    );
    form.setValue("skills", [...currentSkills, ...newSkills]);
  };

  const addGameDevSkills = () => {
    const gameDevSkills = [
      "Unity",
      "C#",
      "Unreal Engine",
      "Blender",
      "Game Design",
      "Level Design",
    ];
    const currentSkills = form.getValues("skills");
    const newSkills = gameDevSkills.filter(
      skill => !currentSkills.includes(skill)
    );
    form.setValue("skills", [...currentSkills, ...newSkills]);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Code className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">What are your skills?</h3>
        </div>
        <p className="text-muted-foreground">
          Add the technologies, programming languages, and tools you're
          experienced with.
        </p>
      </div>

      <FormField
        control={form.control as any}
        name="skills"
        render={() => (
          <FormItem>
            <FormLabel>Your Skills</FormLabel>
            <div className="space-y-4">
              <div className="flex gap-2">
                <FormControl>
                  <Input
                    placeholder="Add a skill..."
                    value={newSkill}
                    onChange={e => setNewSkill(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </FormControl>
                <Button
                  type="button"
                  onClick={handleAddSkill}
                  disabled={!newSkill}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {filteredSuggestions.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Suggestions:</p>
                  <div className="flex flex-wrap gap-2">
                    {filteredSuggestions.map(suggestion => (
                      <Badge
                        key={suggestion}
                        variant="secondary"
                        className="cursor-pointer hover:bg-secondary/80"
                        onClick={() => addSkill(suggestion)}
                      >
                        {suggestion}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addPopularSkills}
                    className="flex items-center gap-2"
                  >
                    <Zap className="h-4 w-4" />
                    Add Popular Skills
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addGameDevSkills}
                    className="flex items-center gap-2"
                  >
                    <Code className="h-4 w-4" />
                    Add Game Dev Skills
                  </Button>
                </div>

                {skills.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      Your Skills ({skills.length}):
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="default"
                          className="flex items-center gap-1"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-1 hover:bg-primary-foreground/20 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {skills.length === 0 && (
        <div className="text-center p-6 border-2 border-dashed border-muted rounded-lg">
          <Code className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">
            Start by adding your first skill above
          </p>
        </div>
      )}

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Tip:</strong> Add both technical skills (programming
          languages, frameworks) and soft skills (project management, teamwork).
          You can always edit these later.
        </p>
      </div>
    </div>
  );
};
