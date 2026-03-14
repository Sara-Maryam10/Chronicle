import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTokenPayload } from "@/lib/jwt";
import { withErrorHandler } from "@/middleware/errorHandler";

// GET /api/auth/me — returns the currently authenticated user from the JWT cookie
async function handler(_req: NextRequest): Promise<NextResponse> {
  const payload = await getTokenPayload();

  if (!payload) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const user = await prisma.user.findUnique({
    where:  { id: payload.userId },
    select: { id: true, email: true, username: true, name: true, role: true, avatar: true },
  });

  if (!user) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  return NextResponse.json({ user });
}

export const GET = withErrorHandler(handler);
