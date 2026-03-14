import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { categorySchema } from "@/lib/schemas";
import { toSlug } from "@/lib/slugify";
import { withAuth } from "@/middleware/auth";
import { requireRole } from "@/middleware/rbac";
import { withErrorHandler } from "@/middleware/errorHandler";

// GET /api/categories — public
export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: { where: { status: "PUBLISHED" } } } } },
  });
  return NextResponse.json({ categories });
}

// POST /api/categories — ADMIN only
async function createCategory(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const data = categorySchema.parse(body);
  const slug = data.slug || toSlug(data.name);

  const existing = await prisma.category.findUnique({ where: { slug } });
  if (existing) return NextResponse.json({ error: "Category slug already exists" }, { status: 409 });

  const category = await prisma.category.create({ data: { name: data.name, slug } });
  return NextResponse.json({ category }, { status: 201 });
}

export const POST = withAuth(requireRole("ADMIN", withErrorHandler(createCategory)));
