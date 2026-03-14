import { NextRequest, NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/jwt";
import { withAuth } from "@/middleware/auth";
import { withErrorHandler } from "@/middleware/errorHandler";

async function handler(_req: NextRequest): Promise<NextResponse> {
  const response = NextResponse.json({ message: "Logged out successfully" });
  clearAuthCookie(response);
  return response;
}

export const POST = withAuth(withErrorHandler(handler));
