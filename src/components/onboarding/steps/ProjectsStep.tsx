"use client";

import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { useOnboardingContext } from "@/contexts/OnboardingContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Plus, X, Edit2, Folder, ExternalLink, Github } from "lucide-react";

export const ProjectsStep = () => {
  const { form } = useOnboardingContext();

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
    update: updateProject,
  } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  const [editing, setEditing] = useState<number | null>(null);
  const [currentTab, setCurrentTab] = useState("basic");

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    tags: [] as string[],
    highlight: "",
    features: [] as string[],
    challenges: [] as string[],
    technologies: [] as string[],
    githubUrl: "",
    liveUrl: "",
    duration: "",
    teamSize: "",
    role: "",
  });

  // Input states for arrays
  const [newTag, setNewTag] = useState("");
  const [newFeature, setNewFeature] = useState("");
  const [newChallenge, setNewChallenge] = useState("");
  const [newTechnology, setNewTechnology] = useState("");

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      longDescription: "",
      tags: [],
      highlight: "",
      features: [],
      challenges: [],
      technologies: [],
      githubUrl: "",
      liveUrl: "",
      duration: "",
      teamSize: "",
      role: "",
    });
    setCurrentTab("basic");
    setNewTag("");
    setNewFeature("");
    setNewChallenge("");
    setNewTechnology("");
  };

  const handleSubmit = () => {
    if (formData.title && formData.description) {
      if (editing !== null) {
        updateProject(editing, formData);
        setEditing(null);
      } else {
        appendProject(formData);
      }
      resetForm();
    }
  };

  const handleEdit = (index: number) => {
    const project = form.getValues(`projects.${index}`);
    setFormData({
      title: project.title || "",
      description: project.description || "",
      longDescription: project.longDescription || "",
      tags: project.tags || [],
      highlight: project.highlight || "",
      features: project.features || [],
      challenges: project.challenges || [],
      technologies: project.technologies || [],
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      duration: project.duration || "",
      teamSize: project.teamSize || "",
      role: project.role || "",
    });
    setEditing(index);
  };

  const handleDelete = (index: number) => {
    removeProject(index);
  };

  const handleCancel = () => {
    setEditing(null);
    resetForm();
  };

  // Array manipulation helpers
  const addToArray = (
    field: keyof typeof formData,
    value: string,
    setter: (value: string) => void
  ) => {
    const currentValue = formData[field];
    if (value && Array.isArray(currentValue) && !currentValue.includes(value)) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value],
      }));
      setter("");
    }
  };

  const removeFromArray = (field: keyof typeof formData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: Array.isArray(prev[field])
        ? (prev[field] as string[]).filter((_, i) => i !== index)
        : prev[field],
    }));
  };

  const suggestedTags = [
    "React",
    "Vue",
    "Angular",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "TypeScript",
    "JavaScript",
    "Python",
    "Java",
    "C#",
    "C++",
    "Unity",
    "Unreal Engine",
    "Mobile",
    "Web",
    "Desktop",
    "Game",
    "AI",
    "ML",
    "AR/VR",
  ];

  const addQuickProject = (type: "game" | "web" | "mobile") => {
    const templates = {
      game: {
        title: "Game Project",
        description: "An engaging game developed with modern tools",
        tags: ["Game Development", "Unity", "C#"],
        technologies: ["Unity", "C#", "Visual Studio"],
        role: "Game Developer",
        teamSize: "1-2 developers",
        duration: "3-6 months",
      },
      web: {
        title: "Web Application",
        description: "A responsive web application with modern features",
        tags: ["Web Development", "React", "JavaScript"],
        technologies: ["React", "Node.js", "Express", "MongoDB"],
        role: "Full Stack Developer",
        teamSize: "2-3 developers",
        duration: "2-4 months",
      },
      mobile: {
        title: "Mobile App",
        description: "Cross-platform mobile application",
        tags: ["Mobile Development", "React Native", "JavaScript"],
        technologies: ["React Native", "JavaScript", "Firebase"],
        role: "Mobile Developer",
        teamSize: "1-2 developers",
        duration: "3-5 months",
      },
    };

    setFormData(prev => ({
      ...prev,
      ...templates[type],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Showcase your projects</h3>
        <p className="text-muted-foreground">
          Add your best work to demonstrate your skills and experience.
        </p>
      </div>

      <FormField
        control={form.control}
        name="projects"
        render={() => (
          <FormItem>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Folder className="h-5 w-5" />
                    {editing !== null ? "Edit Project" : "Add New Project"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={currentTab} onValueChange={setCurrentTab}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="basic">Basic Info</TabsTrigger>
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="links">Links & Meta</TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Project Title *</Label>
                          <Input
                            id="title"
                            placeholder="e.g., My Awesome Game"
                            value={formData.title}
                            onChange={e =>
                              setFormData({
                                ...formData,
                                title: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="highlight">Highlight Tag</Label>
                          <Input
                            id="highlight"
                            placeholder="e.g., Featured Project"
                            value={formData.highlight}
                            onChange={e =>
                              setFormData({
                                ...formData,
                                highlight: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Short Description *</Label>
                        <Textarea
                          id="description"
                          placeholder="Brief description of your project..."
                          value={formData.description}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              description: e.target.value,
                            })
                          }
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Tags</Label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a tag..."
                            value={newTag}
                            onChange={e => setNewTag(e.target.value)}
                            onKeyPress={e =>
                              e.key === "Enter" &&
                              (e.preventDefault(),
                              addToArray("tags", newTag, setNewTag))
                            }
                          />
                          <Button
                            type="button"
                            onClick={() =>
                              addToArray("tags", newTag, setNewTag)
                            }
                            disabled={!newTag}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {suggestedTags
                            .filter(tag => !formData.tags.includes(tag))
                            .slice(0, 6)
                            .map(tag => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="cursor-pointer"
                                onClick={() =>
                                  addToArray("tags", tag, setNewTag)
                                }
                              >
                                {tag}
                              </Badge>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {formData.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="default"
                              className="flex items-center gap-1"
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeFromArray("tags", index)}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="details" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="longDescription">
                          Detailed Description
                        </Label>
                        <Textarea
                          id="longDescription"
                          placeholder="Provide a detailed description of your project, what it does, and how you built it..."
                          value={formData.longDescription}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              longDescription: e.target.value,
                            })
                          }
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Technologies Used</Label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a technology..."
                            value={newTechnology}
                            onChange={e => setNewTechnology(e.target.value)}
                            onKeyPress={e =>
                              e.key === "Enter" &&
                              (e.preventDefault(),
                              addToArray(
                                "technologies",
                                newTechnology,
                                setNewTechnology
                              ))
                            }
                          />
                          <Button
                            type="button"
                            onClick={() =>
                              addToArray(
                                "technologies",
                                newTechnology,
                                setNewTechnology
                              )
                            }
                            disabled={!newTechnology}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {formData.technologies.map((tech, index) => (
                            <Badge
                              key={index}
                              variant="default"
                              className="flex items-center gap-1"
                            >
                              {tech}
                              <button
                                type="button"
                                onClick={() =>
                                  removeFromArray("technologies", index)
                                }
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Key Features</Label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a feature..."
                            value={newFeature}
                            onChange={e => setNewFeature(e.target.value)}
                            onKeyPress={e =>
                              e.key === "Enter" &&
                              (e.preventDefault(),
                              addToArray("features", newFeature, setNewFeature))
                            }
                          />
                          <Button
                            type="button"
                            onClick={() =>
                              addToArray("features", newFeature, setNewFeature)
                            }
                            disabled={!newFeature}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {formData.features.map((feature, index) => (
                            <Badge
                              key={index}
                              variant="default"
                              className="flex items-center gap-1"
                            >
                              {feature}
                              <button
                                type="button"
                                onClick={() =>
                                  removeFromArray("features", index)
                                }
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Challenges & Solutions</Label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a challenge..."
                            value={newChallenge}
                            onChange={e => setNewChallenge(e.target.value)}
                            onKeyPress={e =>
                              e.key === "Enter" &&
                              (e.preventDefault(),
                              addToArray(
                                "challenges",
                                newChallenge,
                                setNewChallenge
                              ))
                            }
                          />
                          <Button
                            type="button"
                            onClick={() =>
                              addToArray(
                                "challenges",
                                newChallenge,
                                setNewChallenge
                              )
                            }
                            disabled={!newChallenge}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {formData.challenges.map((challenge, index) => (
                            <Badge
                              key={index}
                              variant="default"
                              className="flex items-center gap-1"
                            >
                              {challenge}
                              <button
                                type="button"
                                onClick={() =>
                                  removeFromArray("challenges", index)
                                }
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="links" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="githubUrl">GitHub Repository</Label>
                          <Input
                            id="githubUrl"
                            placeholder="https://github.com/username/project"
                            value={formData.githubUrl}
                            onChange={e =>
                              setFormData({
                                ...formData,
                                githubUrl: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="liveUrl">Live Demo URL</Label>
                          <Input
                            id="liveUrl"
                            placeholder="https://yourproject.com"
                            value={formData.liveUrl}
                            onChange={e =>
                              setFormData({
                                ...formData,
                                liveUrl: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="duration">Duration</Label>
                          <Input
                            id="duration"
                            placeholder="e.g., 3 months"
                            value={formData.duration}
                            onChange={e =>
                              setFormData({
                                ...formData,
                                duration: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="teamSize">Team Size</Label>
                          <Input
                            id="teamSize"
                            placeholder="e.g., 3 developers"
                            value={formData.teamSize}
                            onChange={e =>
                              setFormData({
                                ...formData,
                                teamSize: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Your Role</Label>
                          <Input
                            id="role"
                            placeholder="e.g., Lead Developer"
                            value={formData.role}
                            onChange={e =>
                              setFormData({ ...formData, role: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-between items-center pt-4 border-t mt-6">
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addQuickProject("web")}
                      >
                        Web App Template
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addQuickProject("game")}
                      >
                        Game Template
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addQuickProject("mobile")}
                      >
                        Mobile Template
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      {editing !== null && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                      )}
                      <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!formData.title || !formData.description}
                      >
                        {editing !== null ? "Update" : "Add"} Project
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {projectFields.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold">
                    Your Projects ({projectFields.length})
                  </h4>
                  {projectFields.map((field, index) => {
                    const project = form.watch(`projects.${index}`);
                    return (
                      <Card key={field.id}>
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className="font-semibold">
                                  {project.title}
                                </h5>
                                {project.highlight && (
                                  <Badge variant="secondary">
                                    {project.highlight}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {project.description}
                              </p>
                              <div className="flex flex-wrap gap-1 mb-2">
                                {project.tags
                                  ?.slice(0, 3)
                                  .map((tag: string, tagIndex: number) => (
                                    <Badge
                                      key={tagIndex}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                {project.tags?.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{project.tags.length - 3} more
                                  </Badge>
                                )}
                              </div>
                              <div className="flex gap-2">
                                {project.githubUrl && (
                                  <Button size="sm" variant="outline" asChild>
                                    <a
                                      href={project.githubUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1"
                                    >
                                      <Github className="h-3 w-3" />
                                      Code
                                    </a>
                                  </Button>
                                )}
                                {project.liveUrl && (
                                  <Button size="sm" variant="outline" asChild>
                                    <a
                                      href={project.liveUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1"
                                    >
                                      <ExternalLink className="h-3 w-3" />
                                      Live Demo
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(index)}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Tip:</strong> Add 3-5 of your best projects that showcase
          different skills. Include both completed projects and works in
          progress.
        </p>
      </div>
    </div>
  );
};
