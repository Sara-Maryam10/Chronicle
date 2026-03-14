import { prisma } from "@/lib/prisma";

/**
 * Convert a title to a URL-safe slug.
 * e.g. "Hello World!" → "hello-world"
 */
function toSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")   // remove non-alphanumeric (except spaces and hyphens)
    .replace(/\s+/g, "-")            // replace spaces with hyphens
    .replace(/-+/g, "-")             // collapse multiple hyphens
    .replace(/^-|-$/g, "");          // trim leading/trailing hyphens
}

/**
 * Generate a unique slug for a post.
 * If "hello-world" exists, tries "hello-world-2", "hello-world-3", etc.
 */
export async function generateUniqueSlug(
  title: string,
  excludeId?: string
): Promise<string> {
  const base = toSlug(title);
  let candidate = base;
  let suffix = 2;

  while (true) {
    const existing = await prisma.post.findFirst({
      where: {
        slug: candidate,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
      select: { id: true },
    });

    if (!existing) return candidate;
    candidate = `${base}-${suffix}`;
    suffix++;
  }
}

export { toSlug };
