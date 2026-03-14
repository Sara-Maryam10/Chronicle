import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sanitizeHtml } from "@/lib/sanitize";
import { generateUniqueSlug } from "@/lib/slugify";
import { createPostSchema } from "@/lib/schemas";
import { withAuth, getUserId } from "@/middleware/auth";
import { requireRole } from "@/middleware/rbac";
import { withErrorHandler } from "@/middleware/errorHandler";

// ── GET /api/posts ────────────────────────────────────────────────────────────
// Public:   returns paginated PUBLISHED posts
// ?mine=true (requires auth cookie): returns ALL posts by the current user (any status)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page     = Math.max(1, Number(searchParams.get("page")  ?? 1));
  const limit    = Math.min(50, Math.max(1, Number(searchParams.get("limit") ?? 20)));
  const category = searchParams.get("category") ?? undefined;
  const author   = searchParams.get("author")   ?? undefined;
  const mine     = searchParams.get("mine") === "true";
  const skip     = (page - 1) * limit;

  // Dashboard: return all posts for the authenticated user
  if (mine) {
    const token = req.cookies.get("chronicle_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    try {
      const { verifyToken } = await import("@/lib/jwt");
      const payload = verifyToken(token);
      const [posts, totalCount] = await Promise.all([
        prisma.post.findMany({
          where:   { authorId: payload.userId },
          skip,
          take:    limit,
          orderBy: { createdAt: "desc" },
          include: {
            author:   { select: { id: true, name: true, username: true, avatar: true } },
            category: true,
          },
        }),
        prisma.post.count({ where: { authorId: payload.userId } }),
      ]);
      return NextResponse.json({ posts, totalCount, page, limit, totalPages: Math.ceil(totalCount / limit) });
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
  }

  // Public: only PUBLISHED posts
  const where = {
    status: "PUBLISHED" as const,
    ...(category ? { category: { slug: category } } : {}),
    ...(author   ? { author:   { username: author } } : {}),
  };

  const [posts, totalCount] = await Promise.all([
    prisma.post.findMany({
      where,
      skip,
      take:    limit,
      orderBy: { publishedAt: "desc" },
      include: {
        author:   { select: { id: true, name: true, username: true, avatar: true } },
        category: true,
      },
    }),
    prisma.post.count({ where }),
  ]);

  return NextResponse.json({ posts, totalCount, page, limit, totalPages: Math.ceil(totalCount / limit) });
}

// ── POST /api/posts — AUTHOR+ ─────────────────────────────────────────────────
async function createPost(req: NextRequest): Promise<NextResponse> {
  const userId = getUserId(req)!;
  const body   = await req.json();
  const data   = createPostSchema.parse(body);

  const slug        = await generateUniqueSlug(data.title);
  const content     = sanitizeHtml(data.content);
  const publishedAt = data.status === "PUBLISHED" ? new Date() : null;

  const post = await prisma.post.create({
    data: {
      title:         data.title,
      slug,
      excerpt:       data.excerpt  || null,
      content,
      featuredImage: data.featuredImage || null,
      categoryId:    data.categoryId    || null,
      status:        data.status,
      publishedAt,
      authorId:      userId,
    },
    include: {
      author:   { select: { id: true, name: true, username: true, avatar: true } },
      category: true,
    },
  });

  return NextResponse.json({ post }, { status: 201 });
}

export const POST = withAuth(requireRole("AUTHOR", withErrorHandler(createPost)));
