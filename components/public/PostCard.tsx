import Link from "next/link";

interface Post {
  id: number; title: string; slug: string; excerpt: string;
  author: string; authorUsername?: string; date: string;
  readingTime?: string; category?: string; categorySlug?: string; tags?: string[];
}

export default function PostCard({ post, variant = "default" }: { post: Post; variant?: "default" | "featured" | "compact" }) {

  if (variant === "featured") {
    return (
      <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
        <article className="card" style={{ padding: "36px 40px", background: "var(--bg-dark)", cursor: "pointer", border: "1px solid var(--border-dark)" }}>
          {post.category && (
            <span className="tag-amber" style={{ padding: "3px 12px", marginBottom: "16px", display: "inline-block" }}>{post.category}</span>
          )}
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.55rem", fontWeight: 700, lineHeight: 1.3, color: "#e8f0ea", marginBottom: "14px", letterSpacing: "-0.01em" }}>
            {post.title}
          </h2>
          <p className="line-clamp-3" style={{ fontFamily: "var(--font-body)", fontSize: "0.925rem", lineHeight: 1.65, color: "#7a9d80", marginBottom: "24px" }}>
            {post.excerpt}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "#567a5c" }}>
            <div className="avatar" style={{ width: "26px", height: "26px", fontSize: "0.72rem", background: "var(--accent-warm)" }}>{post.author.charAt(0)}</div>
            <span style={{ color: "#a8c5ad", fontWeight: 600 }}>{post.author}</span>
            <span>·</span><span>{post.date}</span>
            {post.readingTime && <><span>·</span><span>{post.readingTime}</span></>}
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
        <article style={{ paddingTop: "16px", paddingBottom: "16px", borderBottom: "1px solid var(--border)", cursor: "pointer" }}>
          <div style={{ display: "flex", gap: "12px", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "0.925rem", fontWeight: 600, lineHeight: 1.35, color: "var(--fg)", marginBottom: "5px" }}>{post.title}</h3>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--fg-faint)", display: "flex", gap: "6px" }}>
                <span>{post.author}</span><span>·</span><span>{post.readingTime || post.date}</span>
              </div>
            </div>
            {post.category && (
              <span className="tag-pill" style={{ padding: "3px 10px", fontSize: "0.68rem", flexShrink: 0 }}>{post.category}</span>
            )}
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <article className="card" style={{ padding: "24px 26px", cursor: "pointer" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "18px" }}>
          <div style={{ flex: 1 }}>
            {/* Author */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "11px" }}>
              <div className="avatar" style={{ width: "22px", height: "22px", fontSize: "0.6rem" }}>{post.author.charAt(0).toUpperCase()}</div>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 600, color: "var(--fg)" }}>{post.author}</span>
              {post.category && (
                <><span style={{ color: "var(--border)", fontSize: "0.7rem" }}>in</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--accent)", fontWeight: 500 }}>{post.category}</span></>
              )}
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, lineHeight: 1.32, color: "var(--fg)", marginBottom: "8px", letterSpacing: "-0.01em" }}>{post.title}</h2>
            <p className="line-clamp-2" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.6, color: "var(--fg-muted)" }}>{post.excerpt}</p>
          </div>
          {/* Thumbnail */}
          <div style={{ width: "108px", height: "72px", borderRadius: "8px", background: "var(--bg-subtle)", border: "1px solid var(--border)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", opacity: 0.13, color: "var(--accent)" }}>C</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "14px", paddingTop: "12px", borderTop: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--fg-faint)" }}>
            <span>{post.date}</span>
            {post.readingTime && <><span>·</span><span>{post.readingTime}</span></>}
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            {post.tags?.slice(0, 2).map(t => (
              <span key={t} className="tag-pill" style={{ padding: "2px 10px" }}>{t}</span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
