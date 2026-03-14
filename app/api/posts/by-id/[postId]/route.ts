import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sanitizeHtml } from "@/lib/sanitize";
import { generateUniqueSlug } from "@/lib/slugify";
import { updatePostSchema } from "@/lib/schemas";
import { withAuth, getUserId, getUserRole } from "@/middleware/auth";
import { withErrorHandler } from "@/middleware/errorHandler";

type Context = { params: Promise<{ postId: string }> };

// ── GET /api/posts/by-id/[postId] — owner or ADMIN (for edit page prefill) ───
async function getPost(req: NextRequest, context: Context): Promise<NextResponse> {
  const { postId } = await context.params;
  const userId     = getUserId(req)!;
  const role       = getUserRole(req)!;

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author:   { select: { id: true, name: true, username: true, avatar: true } },
      category: true,
    },
  });

  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  // Only owner or admin can fetch (includes drafts)
  if (post.authorId !== userId && role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ post });
}

// ── PUT /api/posts/by-id/[postId] — owner or ADMIN ───────────────────────────
async function updatePost(req: NextRequest, context: Context): Promise<NextResponse> {
  const { postId } = await context.params;
  const userId     = getUserId(req)!;
  const role       = getUserRole(req)!;

  const existing = await prisma.post.findUnique({
    where:  { id: postId },
    select: { authorId: true, status: true, publishedAt: true },
  });

  if (!existing) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  if (existing.authorId !== userId && role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const data = updatePostSchema.parse(body);

  const slug        = data.title ? await generateUniqueSlug(data.title, postId) : undefined;
  const content     = data.content ? sanitizeHtml(data.content) : undefined;
  const wasPublished = existing.status !== "PUBLISHED" && data.status === "PUBLISHED";

  const updated = await prisma.post.update({
    where: { id: postId },
    data: {
      ...(data.title     ? { title:         data.title }               : {}),
      ...(slug           ? { slug }                                     : {}),
      ...(data.excerpt   !== undefined ? { excerpt: data.excerpt }      : {}),
      ...(content        ? { content }                                  : {}),
      ...(data.featuredImage !== undefined ? { featuredImage: data.featuredImage || null } : {}),
      ...(data.categoryId    !== undefined ? { categoryId:    data.categoryId    || null } : {}),
      ...(data.status    ? { status: data.status }                      : {}),
      ...(wasPublished   ? { publishedAt: new Date() }                  : {}),
    },
    include: {
      author:   { select: { id: true, name: true, username: true, avatar: true } },
      category: true,
    },
  });

  return NextResponse.json({ post: updated });
}

// ── DELETE /api/posts/by-id/[postId] — owner or ADMIN ────────────────────────
async function deletePost(req: NextRequest, context: Context): Promise<NextResponse> {
  const { postId } = await context.params;
  const userId     = getUserId(req)!;
  const role       = getUserRole(req)!;

  const existing = await prisma.post.findUnique({
    where:  { id: postId },
    select: { authorId: true },
  });

  if (!existing) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  if (existing.authorId !== userId && role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.post.delete({ where: { id: postId } });
  return NextResponse.json({ message: "Post deleted" });
}

export const GET    = withAuth(withErrorHandler(getPost));
export const PUT    = withAuth(withErrorHandler(updatePost));
export const DELETE = withAuth(withErrorHandler(deletePost));
