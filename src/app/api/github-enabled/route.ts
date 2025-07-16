import { NextResponse } from "next/server";
import { isGitHubEnabled } from "@/lib/env-handler";

export async function GET() {
  try {
    const enabled = isGitHubEnabled();

    return NextResponse.json({
      enabled,
    });
  } catch (error) {
    console.error("Error checking GitHub status:", error);

    return NextResponse.json({
      enabled: false,
    });
  }
}
