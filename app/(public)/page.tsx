import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import PostCard from "@/components/public/PostCard";
import { posts, categories } from "@/lib/mock";
import Link from "next/link";

export default function HomePage() {
  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const latestPosts = posts.filter((p) => p.id !== featuredPost.id).slice(0, 6);
  const sidebarPosts = posts.filter((p) => p.id !== featuredPost.id).slice(6, 11);

  return (
    <>
      <Header />

      {/* ── HERO ── */}
      <section style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)", paddingTop: "80px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 28px" }}>

          <div className="fade-up fade-up-1" style={{ textAlign: "center", marginBottom: "64px" }}>
            {/* Eyebrow badge */}
            <span className="tag-amber" style={{ padding: "5px 16px", marginBottom: "28px", display: "inline-block", fontSize: "0.7rem" }}>
              ✦ Editor's pick
            </span>

            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem, 6.5vw, 5rem)",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "var(--fg)",
              maxWidth: "800px",
              margin: "0 auto 24px",
            }}>
              {featuredPost.title}
            </h1>

            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", lineHeight: 1.7, color: "var(--fg-muted)", maxWidth: "520px", margin: "0 auto 36px" }}>
              {featuredPost.excerpt}
            </p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
              <Link href={`/blog/${featuredPost.slug}`} className="btn-primary" style={{ padding: "13px 30px", borderRadius: "100px", fontSize: "0.925rem" }}>
                Read this story →
              </Link>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.825rem", color: "var(--fg-faint)" }}>
                by <span style={{ color: "var(--fg)", fontWeight: 600 }}>{featuredPost.author}</span>
                {featuredPost.readingTime && ` · ${featuredPost.readingTime}`}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="fade-up fade-up-2" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "var(--border)", border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden", marginBottom: "52px", boxShadow: "0 2px 16px rgba(26,31,27,0.06)" }}>
            {[{ n: "12K+", label: "Active readers" }, { n: "340+", label: "Published stories" }, { n: "48", label: "Trusted writers" }].map((s, i) => (
              <div key={i} style={{ padding: "28px 24px", background: "#fff", textAlign: "center" }}>
                <div className="stat-number">{s.n}</div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--fg-muted)", marginTop: "5px" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Categories */}
          <div className="fade-up fade-up-3" style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
            {categories.map((cat) => (
              <Link key={cat.id} href={`/blog?category=${cat.slug}`} className="tag-pill" style={{ padding: "8px 18px", fontSize: "0.825rem" }}>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRENDING STRIP ── */}
      <div style={{ background: "var(--bg-dark)", borderBottom: "1px solid var(--border-dark)", padding: "14px 28px" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", alignItems: "center", gap: "24px" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", background: "var(--accent-warm)", color: "#fff", padding: "3px 10px", borderRadius: "4px", flexShrink: 0 }}>Trending</span>
          <div style={{ display: "flex", gap: "28px", overflow: "hidden" }}>
            {posts.slice(0, 5).map((p, i) => (
              <Link key={p.id} href={`/blog/${p.slug}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--accent)", fontSize: "0.95rem" }}>0{i + 1}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "#7a9d80" }}>{p.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main style={{ maxWidth: "1240px", margin: "0 auto", padding: "72px 28px 0", display: "grid", gridTemplateColumns: "1fr 320px", gap: "72px", alignItems: "start" }}>

        {/* Posts */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px", paddingBottom: "18px", borderBottom: "2px solid var(--accent)" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700, color: "var(--fg)" }}>Latest stories</h2>
            <Link href="/blog" style={{ fontFamily: "var(--font-body)", fontSize: "0.825rem", fontWeight: 600, color: "var(--accent)", textDecoration: "none" }}>See all →</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {latestPosts.map((post, i) => (
              <div key={post.id} className={`fade-up fade-up-${Math.min(i + 1, 5)}`}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: "36px", textAlign: "center" }}>
            <Link href="/blog" className="btn-outline" style={{ padding: "12px 32px", borderRadius: "100px", fontSize: "0.875rem" }}>
              Load more stories
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <aside style={{ position: "sticky", top: "104px" }}>
          <div style={{ marginBottom: "32px" }}>
            <h3 style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-faint)", marginBottom: "14px" }}>Discover topics</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
              {categories.map((cat) => (
                <Link key={cat.id} href={`/blog?category=${cat.slug}`} className="tag-pill" style={{ padding: "6px 14px", fontSize: "0.8rem" }}>{cat.name}</Link>
              ))}
            </div>
          </div>

          <div className="divider" style={{ marginBottom: "28px" }} />

          <div style={{ marginBottom: "32px" }}>
            <h3 style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-faint)", marginBottom: "4px" }}>More to read</h3>
            {sidebarPosts.map((post) => <PostCard key={post.id} post={post} variant="compact" />)}
          </div>

          <div className="divider" style={{ marginBottom: "28px" }} />

          {/* Newsletter */}
          <div className="card" style={{ padding: "26px 24px" }}>
            <span className="tag-amber" style={{ padding: "3px 10px", marginBottom: "14px", display: "inline-block", fontSize: "0.65rem" }}>Weekly dispatch</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "var(--fg)", marginBottom: "9px" }}>Never miss a story</h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", lineHeight: 1.6, color: "var(--fg-muted)", marginBottom: "16px" }}>Hand-picked reads every Sunday. No spam, ever.</p>
            <input type="email" placeholder="your@email.com" className="input-field" style={{ padding: "10px 13px", marginBottom: "10px" }} />
            <button className="btn-primary" style={{ width: "100%", padding: "10px", borderRadius: "8px", fontSize: "0.875rem" }}>Subscribe →</button>
          </div>

          <div className="divider" style={{ margin: "28px 0" }} />

          {/* Write CTA */}
          <div style={{ textAlign: "center", padding: "24px", background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: "10px" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "var(--fg)", marginBottom: "8px" }}>Share your story</h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--fg-muted)", marginBottom: "16px", lineHeight: 1.55 }}>Write for a community of curious readers.</p>
            <Link href="/signup" className="btn-primary" style={{ padding: "9px 22px", borderRadius: "100px", fontSize: "0.825rem", display: "inline-block" }}>Start writing</Link>
          </div>
        </aside>
      </main>

      {/* ── STAFF PICKS ── */}
      <section className="dark-section" style={{ marginTop: "96px", padding: "80px 28px" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px" }}>
            <div>
              <span className="tag-amber" style={{ padding: "4px 14px", marginBottom: "14px", display: "inline-block" }}>Staff Picks</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.9rem, 4vw, 2.8rem)", fontWeight: 700, color: "#e8f0ea", lineHeight: 1.15, letterSpacing: "-0.02em" }}>Unmissable reads</h2>
            </div>
            <Link href="/blog" style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 600, color: "var(--accent)", textDecoration: "none" }}>View all →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
            {posts.slice(0, 3).map((p) => (
              <PostCard key={p.id} post={p} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
