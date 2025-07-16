"use client";

import { useOnboardingContext } from "@/contexts/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  FileText,
  Upload,
  Download,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface ResumeFile {
  fileName: string; // e.g., "resume.pdf"
  originalName: string; // Original file name from user
  size: number;
}

export const ResumeUploadStep = () => {
  const { form } = useOnboardingContext();
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [resumeFile, setResumeFile] = useState<ResumeFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resumeFileName = form.watch("resume.fileName");
  const resumeOriginalName = form.watch("resume.originalName");
  const resumeSize = form.watch("resume.size");

  // Initialize resume file state from form data
  useEffect(() => {
    if (resumeFileName && resumeOriginalName) {
      setResumeFile({
        fileName: resumeFileName,
        originalName: resumeOriginalName,
        size: resumeSize || 0,
      });
    }
  }, [resumeFileName, resumeOriginalName, resumeSize]);

  const handleFile = useCallback(
    async (file: File) => {
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file type", {
          description:
            "Please upload a PDF or Word document (.pdf, .doc, .docx)",
        });
        return;
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error("File too large", {
          description: "Please upload a file smaller than 5MB",
        });
        return;
      }

      setIsUploading(true);

      try {
        // Upload file to server
        const formData = new FormData();
        formData.append("resume", file);

        const response = await fetch("/api/upload-resume", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Upload failed");
        }

        const newResumeFile: ResumeFile = {
          fileName: result.data.fileName,
          originalName: result.data.originalName,
          size: result.data.size,
        };

        setResumeFile(newResumeFile);

        // Update form data
        form.setValue("resume.fileName", result.data.fileName);
        form.setValue("resume.originalName", result.data.originalName);
        form.setValue("resume.size", result.data.size);

        toast.success("Resume uploaded successfully!", {
          description: `${result.data.originalName} is ready to be included in your portfolio`,
        });
      } catch (error) {
        console.error("Error uploading resume:", error);
        toast.error("Upload failed", {
          description:
            "There was an error uploading your resume. Please try again.",
        });
      } finally {
        setIsUploading(false);
      }
    },
    [form]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  const handleFileSelect = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  const handleRemoveFile = useCallback(async () => {
    if (resumeFile?.fileName) {
      try {
        // Delete file from server
        const response = await fetch(
          `/api/upload-resume?fileName=${encodeURIComponent(resumeFile.fileName)}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          toast.success("Resume removed successfully");
        } else {
          console.warn("Failed to delete resume from server");
        }
      } catch (error) {
        console.error("Error deleting resume:", error);
      }
    }

    setResumeFile(null);
    form.setValue("resume.fileName", "");
    form.setValue("resume.originalName", "");
    form.setValue("resume.size", 0);

    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [resumeFile, form]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "Unknown size";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Upload Your Resume</h3>
        </div>
        <p className="text-muted-foreground">
          Add your resume to make it easily accessible to potential employers
          and clients.
        </p>
      </div>

      <FormField
        control={form.control as any}
        name="resume"
        render={() => (
          <FormItem>
            <FormLabel>Resume Document</FormLabel>
            <FormControl>
              <div className="space-y-4">
                {!resumeFile ? (
                  <motion.div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                      isDragOver
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/25 hover:border-primary/50"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <AnimatePresence mode="wait">
                      {isUploading ? (
                        <motion.div
                          key="uploading"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-2"
                        >
                          <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            >
                              <Upload className="h-6 w-6 text-primary" />
                            </motion.div>
                          </div>
                          <p className="text-sm font-medium">
                            Uploading resume...
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="upload"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-4"
                        >
                          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                            <Upload className="h-8 w-8 text-primary" />
                          </div>
                          <div className="space-y-2">
                            <p className="text-lg font-medium">
                              Drop your resume here, or{" "}
                              <button
                                type="button"
                                onClick={handleFileSelect}
                                className="text-primary hover:underline"
                              >
                                browse files
                              </button>
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Supports PDF, DOC, and DOCX files up to 5MB
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleFileSelect}
                            className="mt-4"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Choose File
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <Card className="border-2 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
                              <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-green-900 dark:text-green-100 truncate">
                                {resumeFile.originalName}
                              </p>
                              <p className="text-sm text-green-700 dark:text-green-300">
                                {formatFileSize(resumeFile.size)}
                              </p>
                            </div>
                            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            {resumeFile.fileName && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  window.open(
                                    `/${resumeFile.fileName}`,
                                    "_blank"
                                  )
                                }
                                className="border-green-300 dark:border-green-700"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={handleRemoveFile}
                              className="border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="space-y-2">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Resume Tips
            </p>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>
                • Keep your resume up-to-date with recent projects and skills
              </li>
              <li>• Use a clean, professional format that's easy to read</li>
              <li>• Include relevant keywords for your industry</li>
              <li>• Make sure contact information matches your portfolio</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
