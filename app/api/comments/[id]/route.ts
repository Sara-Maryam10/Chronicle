import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth, getUserId, getUserRole } from "@/middleware/auth";
import { withErrorHandler } from "@/middleware/errorHandler";

type Context = { params: Promise<{ id: string }> };

async function handler(req: NextRequest, context: Context): Promise<NextResponse> {
  const { id } = await context.params;
  const userId = getUserId(req)!;
  const role = getUserRole(req)!;

  const comment = await prisma.comment.findUnique({ where: { id }, select: { authorId: true } });
  if (!comment) return NextResponse.json({ error: "Comment not found" }, { status: 404 });
  if (comment.authorId !== userId && role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.comment.delete({ where: { id } });
  return NextResponse.json({ message: "Comment deleted" });
}

export const DELETE = withAuth(withErrorHandler(handler));
