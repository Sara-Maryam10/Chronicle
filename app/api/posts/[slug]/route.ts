import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withErrorHandler } from "@/middleware/errorHandler";

type Context = { params: Promise<{ slug: string }> };

// GET /api/posts/[slug] — public
async function handler(
  _req: NextRequest,
  context: unknown
): Promise<NextResponse> {
  const { slug } = await (context as Context).params;

  const post = await prisma.post.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: {
      author: { select: { id: true, name: true, username: true, avatar: true } },
      category: true,
      comments: {
        orderBy: { createdAt: "desc" },
        include: {
          author: { select: { id: true, name: true, username: true, avatar: true } },
        },
      },
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ post });
}

export const GET = withErrorHandler(handler);