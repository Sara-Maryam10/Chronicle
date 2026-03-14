import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "@/lib/bcrypt";
import { signToken, setAuthCookie } from "@/lib/jwt";
import { signupSchema } from "@/lib/schemas";
import { withRateLimit } from "@/middleware/rateLimit";
import { withErrorHandler } from "@/middleware/errorHandler";

async function handler(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const data = signupSchema.parse(body);

  // Check uniqueness
  const existing = await prisma.user.findFirst({
    where: { OR: [{ email: data.email }, { username: data.username }] },
    select: { email: true, username: true },
  });
  if (existing) {
    const field = existing.email === data.email ? "email" : "username";
    return NextResponse.json({ error: `That ${field} is already taken` }, { status: 409 });
  }

  const passwordHash = await hash(data.password);
  const user = await prisma.user.create({
    data: {
      email: data.email,
      username: data.username,
      name: data.name,
      passwordHash,
      role: "AUTHOR",
    },
    select: { id: true, email: true, username: true, name: true, role: true },
  });

  const token = signToken({ userId: user.id, role: user.role });
  const response = NextResponse.json({ user }, { status: 201 });
  setAuthCookie(response, token);
  return response;
}

export const POST = withRateLimit(withErrorHandler(handler));
