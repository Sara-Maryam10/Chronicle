
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import PostCard from "@/components/public/PostCard";
import { posts } from "@/lib/mock";
import Link from "next/link";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  const relatedPosts = posts.filter((p) => p.slug !== slug && p.categorySlug === post?.categorySlug).slice(0, 3);

  if (!post) {
    return (
      <>
        <Header />
        <main style={{ maxWidth: "680px", margin: "120px auto", padding: "0 28px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 700, color: "var(--fg)", marginBottom: "16px" }}>Story not found</h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--fg-muted)", marginBottom: "32px" }}>The story you're looking for may have been moved or doesn't exist.</p>
          <Link href="/blog" className="btn-primary" style={{ padding: "12px 28px", borderRadius: "100px", textDecoration: "none", fontSize: "0.9rem" }}>Browse all stories</Link>
        </main>
        <Footer />
      </>
    );
  }

  const paragraphs = post.content?.split("\n\n").filter(Boolean) ?? [post.excerpt];

  return (
    <>
      <Header />
      <div id="reading-progress" style={{ width: "0%" }} />

      <article style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 28px" }}>
        {/* Header */}
        <header style={{ maxWidth: "720px", margin: "72px auto 52px", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "22px" }}>
            <Link href="/blog" style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--fg-muted)", textDecoration: "none" }}>← Back</Link>
            {post.category && (
              <>
                <span style={{ color: "var(--border)" }}>·</span>
                <Link href={`/blog?category=${post.categorySlug}`} className="tag-pill" style={{ padding: "4px 13px", fontSize: "0.72rem" }}>{post.category}</Link>
              </>
            )}
          </div>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 5.5vw, 3.8rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.025em", color: "var(--fg)", marginBottom: "22px" }}>
            {post.title}
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", lineHeight: 1.7, color: "var(--fg-muted)", marginBottom: "32px" }}>{post.excerpt}</p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", paddingTop: "24px", borderTop: "1px solid var(--border)" }}>
            <Link href={`/author/${post.authorUsername || post.author}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
              <div className="avatar" style={{ width: "42px", height: "42px", fontSize: "1rem" }}>{post.author.charAt(0)}</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, color: "var(--fg)", fontSize: "0.9rem" }}>{post.author}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.77rem", color: "var(--fg-faint)" }}>{post.date} · {post.readingTime}</div>
              </div>
            </Link>
            <button className="btn-outline" style={{ marginLeft: "auto", padding: "7px 18px", borderRadius: "100px", fontSize: "0.8rem" }}>Follow</button>
          </div>
        </header>

        {/* Hero image */}
        <div style={{ maxWidth: "880px", margin: "0 auto 64px", height: "400px", background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: "14px", boxShadow: "0 8px 40px rgba(26,31,27,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "5rem", opacity: 0.09, color: "var(--accent)", fontWeight: 700 }}>Chronicle</span>
        </div>

        {/* Body + sidebar */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 250px", gap: "72px", maxWidth: "1080px", margin: "0 auto 80px" }}>
          <div className="prose-chronicle">
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <aside style={{ position: "sticky", top: "104px", height: "fit-content" }}>
            {/* Actions */}
            <div style={{ marginBottom: "28px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {[["♥", "Like story"], ["🔖", "Save to list"], ["💬", "Comment"], ["↗", "Share"]].map(([icon, label]) => (
                <button key={label} className="btn-ghost" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", borderRadius: "8px", width: "100%", fontSize: "0.825rem", cursor: "pointer" }}>
                  <span>{icon}</span><span style={{ fontWeight: 500 }}>{label}</span>
                </button>
              ))}
            </div>
            <div className="divider" style={{ marginBottom: "22px" }} />
            {post.tags && post.tags.length > 0 && (
              <div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-faint)", marginBottom: "12px" }}>Tagged</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                  {post.tags.map(t => <span key={t} className="tag-pill" style={{ padding: "5px 12px", cursor: "pointer" }}>{t}</span>)}
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Author card */}
        <div style={{ maxWidth: "720px", margin: "0 auto 80px", padding: "34px 36px", background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: "14px", boxShadow: "var(--shadow-card)" }}>
          <div style={{ display: "flex", gap: "18px", alignItems: "flex-start" }}>
            <div className="avatar" style={{ width: "52px", height: "52px", fontSize: "1.2rem" }}>{post.author.charAt(0)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-faint)", marginBottom: "6px" }}>Written by</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700, color: "var(--fg)", marginBottom: "8px" }}>{post.author}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--fg-muted)", lineHeight: 1.6, marginBottom: "16px" }}>Writer and contributor at Chronicle. Covering technology, culture, and the intersections between them.</p>
              <div style={{ display: "flex", gap: "10px" }}>
                <Link href={`/author/${post.authorUsername || post.author}`} className="btn-outline" style={{ padding: "8px 18px", borderRadius: "100px", fontSize: "0.825rem" }}>View profile</Link>
                <button className="btn-primary" style={{ padding: "8px 18px", borderRadius: "100px", fontSize: "0.825rem" }}>Follow</button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      {relatedPosts.length > 0 && (
        <section style={{ background: "var(--bg-subtle)", borderTop: "1px solid var(--border)", padding: "72px 28px" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "36px" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700, color: "var(--fg)", letterSpacing: "-0.02em" }}>More from {post.category}</h2>
              <Link href="/blog" style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>Browse all →</Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "18px" }}>
              {relatedPosts.map(p => <PostCard key={p.id} post={p} />)}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
