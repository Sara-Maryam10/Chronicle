import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/jwt";

export interface AuthenticatedRequest extends NextRequest {
  userId?: string;
  userRole?: string;
}

/**
 * Reads the JWT cookie, verifies it, and attaches userId + userRole
 * as custom request headers. Returns 401 if token is missing or invalid.
 */
export function withAuth(
  handler: (req: NextRequest, context?: unknown) => Promise<NextResponse>
) {
  return async (req: NextRequest, context?: unknown): Promise<NextResponse> => {
    const token = req.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    try {
      const payload = verifyToken(token);
      // Clone request with custom headers so downstream handlers can read them
      const requestWithAuth = new NextRequest(req, {
        headers: {
          ...Object.fromEntries(req.headers.entries()),
          "x-user-id": payload.userId,
          "x-user-role": payload.role,
        },
      });
      return handler(requestWithAuth, context);
    } catch {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }
  };
}

/** Read userId from request headers (set by withAuth) */
export function getUserId(req: NextRequest): string | null {
  return req.headers.get("x-user-id");
}

/** Read userRole from request headers (set by withAuth) */
export function getUserRole(req: NextRequest): string | null {
  return req.headers.get("x-user-role");
}
