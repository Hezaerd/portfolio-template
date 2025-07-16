import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("resume") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No resume file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Invalid file type. Only PDF, DOC, and DOCX files are allowed.",
        },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 5MB." },
        { status: 400 }
      );
    }

    // Get file extension
    const fileExtension = path.extname(file.name);
    const fileName = `resume${fileExtension}`;
    const filePath = path.join(process.cwd(), "public", fileName);

    // Remove existing resume file if it exists
    const possibleExtensions = [".pdf", ".doc", ".docx"];
    for (const ext of possibleExtensions) {
      const existingFile = path.join(process.cwd(), "public", `resume${ext}`);
      if (existsSync(existingFile)) {
        try {
          await unlink(existingFile);
          console.log(`Removed existing resume file: resume${ext}`);
        } catch (error) {
          console.warn(`Failed to remove existing file: resume${ext}`, error);
        }
      }
    }

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(filePath, buffer);

    console.log(`Resume uploaded successfully: ${fileName}`);

    return NextResponse.json({
      success: true,
      message: "Resume uploaded successfully",
      data: {
        fileName,
        filePath: `/${fileName}`, // Public path for the browser
        originalName: file.name,
        size: file.size,
        type: file.type,
      },
    });
  } catch (error) {
    console.error("Error uploading resume:", error);
    return NextResponse.json(
      { error: "Failed to upload resume" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get("fileName");

    if (!fileName) {
      return NextResponse.json(
        { error: "No fileName provided" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "public", fileName);

    if (existsSync(filePath)) {
      await unlink(filePath);
      console.log(`Resume deleted successfully: ${fileName}`);

      return NextResponse.json({
        success: true,
        message: "Resume deleted successfully",
      });
    } else {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting resume:", error);
    return NextResponse.json(
      { error: "Failed to delete resume" },
      { status: 500 }
    );
  }
}
