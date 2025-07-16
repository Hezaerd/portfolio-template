import { NextRequest, NextResponse } from "next/server";
import { updateEnvLocal } from "@/lib/env-handler";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { GITHUB_TOKEN } = body;

    if (typeof GITHUB_TOKEN !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid token format" },
        { status: 400 }
      );
    }

    const success = updateEnvLocal({ GITHUB_TOKEN });

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: "Failed to update environment file" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error updating environment:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
