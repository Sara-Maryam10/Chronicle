import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import PostCard from "@/components/public/PostCard";
import Pagination from "@/components/public/Pagination";
import { posts, categories } from "@/lib/mock";
import Link from "next/link";

export default function BlogPage({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const activeCategory = searchParams?.category || null;

  const filtered = activeCategory
    ? posts.filter((p) => p.categorySlug === activeCategory)
    : posts;

  return (
    <>
      <Header />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 24px 0" }}>
        {/* Page header */}
        <div style={{ marginBottom: "48px" }}>
          <h1
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#1a1a18",
              marginBottom: "8px",
            }}
          >
            {activeCategory
              ? categories.find((c) => c.slug === activeCategory)?.name || "Stories"
              : "All Stories"}
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
              color: "#9b9b97",
            }}
          >
            {filtered.length} {filtered.length === 1 ? "story" : "stories"}
          </p>
        </div>

        {/* Category filter tabs */}
        <div
          style={{
            display: "flex",
            gap: "0",
            borderBottom: "1px solid #e8e6e1",
            marginBottom: "40px",
            overflowX: "auto",
          }}
        >
          <Link
            href="/blog"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.875rem",
              fontWeight: !activeCategory ? 500 : 400,
              color: !activeCategory ? "#1a1a18" : "#9b9b97",
              textDecoration: "none",
              padding: "12px 20px",
              borderBottom: !activeCategory ? "2px solid #1a1a18" : "2px solid transparent",
              marginBottom: "-1px",
              whiteSpace: "nowrap",
              transition: "color 0.15s ease",
            }}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/blog?category=${cat.slug}`}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.875rem",
                fontWeight: activeCategory === cat.slug ? 500 : 400,
                color: activeCategory === cat.slug ? "#1a1a18" : "#9b9b97",
                textDecoration: "none",
                padding: "12px 20px",
                borderBottom: activeCategory === cat.slug ? "2px solid #1a1a18" : "2px solid transparent",
                marginBottom: "-1px",
                whiteSpace: "nowrap",
                transition: "color 0.15s ease",
              }}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 280px",
            gap: "80px",
            alignItems: "start",
          }}
        >
          {/* Post list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {filtered.length === 0 ? (
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#9b9b97",
                  textAlign: "center",
                  padding: "64px 0",
                }}
              >
                No stories in this category yet.
              </p>
            ) : (
              filtered.map((post) => (
                <div key={post.id} style={{ paddingBottom: "0" }}>
                  <PostCard post={post} />
                </div>
              ))
            )}

            <Pagination totalPages={2} />
          </div>

          {/* Sidebar */}
          <aside style={{ position: "sticky", top: "88px" }}>
            <h3
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#9b9b97",
                marginBottom: "16px",
              }}
            >
              Browse by topic
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/blog?category=${cat.slug}`}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.9rem",
                    color: activeCategory === cat.slug ? "#1a1a18" : "#6b6b67",
                    fontWeight: activeCategory === cat.slug ? 500 : 400,
                    textDecoration: "none",
                    padding: "12px 0",
                    borderBottom: "1px solid #e8e6e1",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {cat.name}
                  <span style={{ fontSize: "0.75rem", color: "#c8c5bf" }}>
                    {posts.filter((p) => p.categorySlug === cat.slug).length}
                  </span>
                </Link>
              ))}
            </div>

            <div style={{ marginTop: "40px" }}>
              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#9b9b97",
                  marginBottom: "16px",
                }}
              >
                Top writers
              </h3>
              {["Priya Nair", "Dev Sharma", "Aisha Farooq", "Marcus Webb"].map((name) => (
                <Link
                  key={name}
                  href={`/author/${name.toLowerCase().replace(" ", "")}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 0",
                    borderBottom: "1px solid #e8e6e1",
                    textDecoration: "none",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: "#1a1a18",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      color: "#faf9f7",
                      flexShrink: 0,
                    }}
                  >
                    {name.charAt(0)}
                  </div>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.875rem",
                      color: "#1a1a18",
                    }}
                  >
                    {name}
                  </span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}
