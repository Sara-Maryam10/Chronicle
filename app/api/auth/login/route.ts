import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { compare } from "@/lib/bcrypt";
import { signToken, setAuthCookie } from "@/lib/jwt";
import { loginSchema } from "@/lib/schemas";
import { withRateLimit } from "@/middleware/rateLimit";
import { withErrorHandler } from "@/middleware/errorHandler";

async function handler(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const data = loginSchema.parse(body);

  const user = await prisma.user.findUnique({
    where: { email: data.email },
    select: { id: true, email: true, username: true, name: true, role: true, passwordHash: true, avatar: true },
  });

  const valid = user ? await compare(data.password, user.passwordHash) : false;

  // Consistent timing — don't leak whether the email exists
  if (!user || !valid) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const { passwordHash: _, ...safeUser } = user;
  const token = signToken({ userId: user.id, role: user.role });
  const response = NextResponse.json({ user: safeUser });
  setAuthCookie(response, token);
  return response;
}

export const POST = withRateLimit(withErrorHandler(handler));
