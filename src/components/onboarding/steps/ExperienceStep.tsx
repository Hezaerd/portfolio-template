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
import { Plus, X, Briefcase, GraduationCap, Edit2 } from "lucide-react";

export const ExperienceStep = () => {
  const { form } = useOnboardingContext();

  const {
    fields: workFields,
    append: appendWork,
    remove: removeWork,
    update: updateWork,
  } = useFieldArray({
    control: form.control,
    name: "workExperience",
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
    update: updateEducation,
  } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const [editingWork, setEditingWork] = useState<number | null>(null);
  const [editingEducation, setEditingEducation] = useState<number | null>(null);

  // Work experience form state
  const [workForm, setWorkForm] = useState({
    title: "",
    company: "",
    period: "",
    description: "",
    color: "primary" as "primary" | "accent",
  });

  // Education form state
  const [educationForm, setEducationForm] = useState({
    degree: "",
    school: "",
    period: "",
    description: "",
  });

  // Work experience handlers
  const handleWorkSubmit = () => {
    if (workForm.title && workForm.company && workForm.period) {
      if (editingWork !== null) {
        updateWork(editingWork, workForm);
        setEditingWork(null);
      } else {
        appendWork(workForm);
      }
      setWorkForm({
        title: "",
        company: "",
        period: "",
        description: "",
        color: "primary",
      });
    }
  };

  const handleEditWork = (index: number) => {
    const workItem = form.getValues(`workExperience.${index}`);
    setWorkForm(workItem);
    setEditingWork(index);
  };

  const handleDeleteWork = (index: number) => {
    removeWork(index);
  };

  const handleCancelWorkEdit = () => {
    setEditingWork(null);
    setWorkForm({
      title: "",
      company: "",
      period: "",
      description: "",
      color: "primary",
    });
  };

  // Education handlers
  const handleEducationSubmit = () => {
    if (educationForm.degree && educationForm.school && educationForm.period) {
      if (editingEducation !== null) {
        updateEducation(editingEducation, educationForm);
        setEditingEducation(null);
      } else {
        appendEducation(educationForm);
      }
      setEducationForm({
        degree: "",
        school: "",
        period: "",
        description: "",
      });
    }
  };

  const handleEditEducation = (index: number) => {
    const educationItem = form.getValues(`education.${index}`);
    setEducationForm(educationItem);
    setEditingEducation(index);
  };

  const handleDeleteEducation = (index: number) => {
    removeEducation(index);
  };

  const handleCancelEducationEdit = () => {
    setEditingEducation(null);
    setEducationForm({
      degree: "",
      school: "",
      period: "",
      description: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Tell us about your experience</h3>
        <p className="text-muted-foreground">
          Add your work experience and educational background to showcase your
          journey.
        </p>
      </div>

      <Tabs defaultValue="work" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="work" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Work Experience
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Education
          </TabsTrigger>
        </TabsList>

        <TabsContent value="work" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                {editingWork !== null
                  ? "Edit Work Experience"
                  : "Add Work Experience"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="work-title">Job Title *</Label>
                  <Input
                    id="work-title"
                    placeholder="e.g., Software Developer"
                    value={workForm.title}
                    onChange={e =>
                      setWorkForm({ ...workForm, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="work-company">Company *</Label>
                  <Input
                    id="work-company"
                    placeholder="e.g., Tech Corp"
                    value={workForm.company}
                    onChange={e =>
                      setWorkForm({ ...workForm, company: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="work-period">Period *</Label>
                  <Input
                    id="work-period"
                    placeholder="e.g., Jan 2023 - Present"
                    value={workForm.period}
                    onChange={e =>
                      setWorkForm({ ...workForm, period: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="work-color">Timeline Color</Label>
                  <select
                    id="work-color"
                    value={workForm.color}
                    onChange={e =>
                      setWorkForm({
                        ...workForm,
                        color: e.target.value as "primary" | "accent",
                      })
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  >
                    <option value="primary">Primary (Blue)</option>
                    <option value="accent">Accent (Orange)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="work-description">Description</Label>
                <Textarea
                  id="work-description"
                  placeholder="Describe your role, responsibilities, and achievements..."
                  value={workForm.description}
                  onChange={e =>
                    setWorkForm({ ...workForm, description: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={handleWorkSubmit}
                  disabled={
                    !workForm.title || !workForm.company || !workForm.period
                  }
                >
                  {editingWork !== null ? "Update" : "Add"} Experience
                </Button>
                {editingWork !== null && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelWorkEdit}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {workFields.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold">
                Work Experience ({workFields.length})
              </h4>
              {workFields.map((field, index) => {
                const workItem = form.watch(`workExperience.${index}`);
                return (
                  <Card key={field.id}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-semibold">{workItem.title}</h5>
                            <Badge
                              variant={
                                workItem.color === "primary"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {workItem.color}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {workItem.company} • {workItem.period}
                          </p>
                          {workItem.description && (
                            <p className="text-sm">{workItem.description}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditWork(index)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteWork(index)}
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
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                {editingEducation !== null ? "Edit Education" : "Add Education"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edu-degree">Degree *</Label>
                  <Input
                    id="edu-degree"
                    placeholder="e.g., Bachelor of Computer Science"
                    value={educationForm.degree}
                    onChange={e =>
                      setEducationForm({
                        ...educationForm,
                        degree: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edu-school">School/University *</Label>
                  <Input
                    id="edu-school"
                    placeholder="e.g., University of Technology"
                    value={educationForm.school}
                    onChange={e =>
                      setEducationForm({
                        ...educationForm,
                        school: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edu-period">Period *</Label>
                <Input
                  id="edu-period"
                  placeholder="e.g., 2019 - 2023"
                  value={educationForm.period}
                  onChange={e =>
                    setEducationForm({
                      ...educationForm,
                      period: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edu-description">Description</Label>
                <Textarea
                  id="edu-description"
                  placeholder="Describe your studies, achievements, relevant coursework..."
                  value={educationForm.description}
                  onChange={e =>
                    setEducationForm({
                      ...educationForm,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={handleEducationSubmit}
                  disabled={
                    !educationForm.degree ||
                    !educationForm.school ||
                    !educationForm.period
                  }
                >
                  {editingEducation !== null ? "Update" : "Add"} Education
                </Button>
                {editingEducation !== null && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelEducationEdit}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {educationFields.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold">
                Education ({educationFields.length})
              </h4>
              {educationFields.map((field, index) => {
                const eduItem = form.watch(`education.${index}`);
                return (
                  <Card key={field.id}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h5 className="font-semibold mb-1">
                            {eduItem.degree}
                          </h5>
                          <p className="text-sm text-muted-foreground mb-1">
                            {eduItem.school} • {eduItem.period}
                          </p>
                          {eduItem.description && (
                            <p className="text-sm">{eduItem.description}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditEducation(index)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteEducation(index)}
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
        </TabsContent>
      </Tabs>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Tip:</strong> Both sections are optional, but adding your
          experience helps visitors understand your background and
          qualifications.
        </p>
      </div>
    </div>
  );
};
