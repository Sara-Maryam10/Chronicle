import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { commentSchema } from "@/lib/schemas";
import { withAuth, getUserId } from "@/middleware/auth";
import { withErrorHandler } from "@/middleware/errorHandler";

async function handler(req: NextRequest): Promise<NextResponse> {
  const userId = getUserId(req)!;
  const body = await req.json();
  const data = commentSchema.parse(body);

  const post = await prisma.post.findUnique({
    where: { id: data.postId, status: "PUBLISHED" },
    select: { id: true },
  });
  if (!post) return NextResponse.json({ error: "Post not found or not published" }, { status: 404 });

  const comment = await prisma.comment.create({
    data: { content: data.content, postId: data.postId, authorId: userId },
    include: { author: { select: { id: true, name: true, username: true, avatar: true } } },
  });

  return NextResponse.json({ comment }, { status: 201 });
}

export const POST = withAuth(withErrorHandler(handler));
