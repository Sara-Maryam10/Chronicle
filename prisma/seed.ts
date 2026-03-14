import { PrismaClient, Role, PostStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Categories ─────────────────────────────────────────────────────────────
  const [technology, design, culture, science, programming] = await Promise.all([
    prisma.category.upsert({ where: { slug: "technology" }, update: {}, create: { name: "Technology", slug: "technology" } }),
    prisma.category.upsert({ where: { slug: "design" }, update: {}, create: { name: "Design", slug: "design" } }),
    prisma.category.upsert({ where: { slug: "culture" }, update: {}, create: { name: "Culture", slug: "culture" } }),
    prisma.category.upsert({ where: { slug: "science" }, update: {}, create: { name: "Science", slug: "science" } }),
    prisma.category.upsert({ where: { slug: "programming" }, update: {}, create: { name: "Programming", slug: "programming" } }),
  ]);

  // ─── Users ──────────────────────────────────────────────────────────────────
  const adminHash = await bcrypt.hash("Admin@1234", 12);
  const authorHash = await bcrypt.hash("Author@1234", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@chronicle.dev" },
    update: {},
    create: {
      email: "admin@chronicle.dev",
      username: "admin",
      name: "Chronicle Admin",
      passwordHash: adminHash,
      role: Role.ADMIN,
    },
  });

  const priya = await prisma.user.upsert({
    where: { email: "priya@chronicle.dev" },
    update: {},
    create: {
      email: "priya@chronicle.dev",
      username: "priyanair",
      name: "Priya Nair",
      passwordHash: authorHash,
      role: Role.AUTHOR,
    },
  });

  const marcus = await prisma.user.upsert({
    where: { email: "marcus@chronicle.dev" },
    update: {},
    create: {
      email: "marcus@chronicle.dev",
      username: "marcuswebb",
      name: "Marcus Webb",
      passwordHash: authorHash,
      role: Role.AUTHOR,
    },
  });

  // ─── Posts ──────────────────────────────────────────────────────────────────
  const posts = [
    {
      title: "The Quiet Revolution of Typographic Design",
      slug: "typographic-design-revolution",
      excerpt: "Typography is no longer just about choosing fonts — it has become the primary language through which digital experiences communicate personality.",
      content: "<p>Typography is no longer just about choosing fonts — it has become the primary language through which digital experiences communicate personality, urgency, and trust.</p><p>For decades, designers treated type as a vessel for content: a neutral carrier that delivered words from page to reader. But somewhere between the desktop publishing revolution and the mobile-first era, something shifted. Typography became the content itself.</p>",
      status: PostStatus.PUBLISHED,
      authorId: priya.id,
      categoryId: design.id,
      publishedAt: new Date("2026-03-09"),
    },
    {
      title: "Why Most AI Products Will Fail in the Next 18 Months",
      slug: "ai-products-will-fail",
      excerpt: "The AI gold rush has produced thousands of products, but the majority are built on a fundamental misunderstanding of what people actually need.",
      content: "<p>The AI gold rush has produced thousands of products, but the majority are built on a fundamental misunderstanding of what people actually need from software.</p><p>Here's the uncomfortable truth: most AI products are solutions in search of problems. They're built because the technology is impressive, not because there's a genuine unmet need.</p>",
      status: PostStatus.PUBLISHED,
      authorId: marcus.id,
      categoryId: technology.id,
      publishedAt: new Date("2026-03-08"),
    },
    {
      title: "The Case for Slower Software",
      slug: "case-for-slower-software",
      excerpt: "Speed is worshipped in tech culture. But some of the most meaningful software experiences are built on deliberate friction.",
      content: "<p>Speed is worshipped in tech culture. Faster load times, faster feedback loops, faster shipping cycles. The entire field has oriented itself around the elimination of waiting.</p><p>But there's a different tradition — one that's easy to miss when you're inside the industry. Some of the most meaningful software experiences are built on deliberate friction.</p>",
      status: PostStatus.PUBLISHED,
      authorId: priya.id,
      categoryId: design.id,
      publishedAt: new Date("2026-03-07"),
    },
    {
      title: "Building in Public: Draft Notes",
      slug: "building-in-public-draft",
      excerpt: "Early thoughts on six months of radical transparency.",
      content: "<p>This is an unfinished draft. More to come.</p>",
      status: PostStatus.DRAFT,
      authorId: marcus.id,
      categoryId: technology.id,
    },
    {
      title: "The Return of Long-Form Writing",
      slug: "return-of-long-form-writing",
      excerpt: "Against all predictions, long-form writing is having a renaissance. But the audiences consuming it aren't the ones anyone expected.",
      content: "<p>Against all predictions, long-form writing is having a renaissance.</p><p>For years, the received wisdom was that the internet was killing deep reading. Attention spans were fragmenting. Twitter had trained us to think in bursts. And yet: newsletter platforms are growing faster than ever.</p>",
      status: PostStatus.PUBLISHED,
      authorId: priya.id,
      categoryId: culture.id,
      publishedAt: new Date("2026-03-02"),
    },
  ];

  for (const postData of posts) {
    await prisma.post.upsert({
      where: { slug: postData.slug },
      update: {},
      create: postData,
    });
  }

  // ─── Comments ────────────────────────────────────────────────────────────────
  const firstPost = await prisma.post.findUnique({ where: { slug: "typographic-design-revolution" } });
  if (firstPost) {
    await prisma.comment.createMany({
      data: [
        { content: "Really insightful piece — the point about variable fonts is especially well made.", postId: firstPost.id, authorId: marcus.id },
        { content: "This changed how I think about our product's typography choices. Thank you.", postId: firstPost.id, authorId: admin.id },
      ],
      skipDuplicates: true,
    });
  }

  console.log("✅ Seeding complete.");
  console.log("\nTest credentials:");
  console.log("  Admin:  admin@chronicle.dev / Admin@1234");
  console.log("  Author: priya@chronicle.dev / Author@1234");
  console.log("  Author: marcus@chronicle.dev / Author@1234");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
