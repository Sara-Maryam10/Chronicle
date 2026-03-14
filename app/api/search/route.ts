import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withErrorHandler } from "@/middleware/errorHandler";

async function handler(req: NextRequest): Promise<NextResponse> {
  const q = new URL(req.url).searchParams.get("q")?.trim();
  if (!q || q.length < 2) return NextResponse.json({ posts: [], totalCount: 0 });

  const posts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { excerpt: { contains: q, mode: "insensitive" } },
      ],
    },
    take: 20,
    orderBy: { publishedAt: "desc" },
    include: {
      author: { select: { id: true, name: true, username: true, avatar: true } },
      category: true,
    },
  });

  return NextResponse.json({ posts, totalCount: posts.length });
}

export const GET = withErrorHandler(handler);
