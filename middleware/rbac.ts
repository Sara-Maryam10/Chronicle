import { NextRequest, NextResponse } from "next/server";
import type { Role } from "@/lib/types";

const ROLE_HIERARCHY: Record<Role, number> = {
  USER: 1,
  AUTHOR: 2,
  ADMIN: 3,
};

/**
 * Role-based access control middleware.
 * Wrap an authenticated handler to enforce a minimum role.
 *
 * Usage:
 *   export const POST = withAuth(requireRole("AUTHOR", handler))
 */
export function requireRole(
  minimumRole: Role,
  handler: (req: NextRequest, context?: unknown) => Promise<NextResponse>
) {
  return async (req: NextRequest, context?: unknown): Promise<NextResponse> => {
    const role = req.headers.get("x-user-role") as Role | null;

    if (!role || ROLE_HIERARCHY[role] < ROLE_HIERARCHY[minimumRole]) {
      return NextResponse.json(
        {
          error: `Forbidden — requires ${minimumRole} role or higher`,
        },
        { status: 403 }
      );
    }

    return handler(req, context);
  };
}
