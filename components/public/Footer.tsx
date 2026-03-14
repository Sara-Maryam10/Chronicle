import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ marginTop: "96px" }}>
      {/* Newsletter band */}
      <div style={{ background: "var(--bg-subtle)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "64px 28px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <span className="tag-amber" style={{ padding: "4px 14px", marginBottom: "20px", display: "inline-block" }}>Weekly dispatch</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.9rem, 4vw, 2.6rem)", fontWeight: 700, lineHeight: 1.2, color: "var(--fg)", marginBottom: "14px", letterSpacing: "-0.02em" }}>
            Stories worth your attention
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--fg-muted)", lineHeight: 1.65, marginBottom: "32px" }}>
            The best long-form writing on technology, design, culture and science — delivered every Sunday. No spam, ever.
          </p>
          <div style={{ display: "flex", gap: "0", maxWidth: "420px", margin: "0 auto", border: "1.5px solid var(--border)", borderRadius: "100px", overflow: "hidden", background: "#fff", boxShadow: "0 2px 12px rgba(26,31,27,0.07)" }}>
            <input type="email" placeholder="your@email.com" style={{ flex: 1, padding: "13px 20px", background: "transparent", border: "none", fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--fg)", outline: "none" }} />
            <button className="btn-primary" style={{ padding: "13px 24px", borderRadius: "0 100px 100px 0", fontSize: "0.875rem", whiteSpace: "nowrap" }}>Subscribe →</button>
          </div>
        </div>
      </div>

      {/* Dark footer */}
      <div style={{ background: "var(--bg-dark-2)", padding: "56px 28px 32px" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", marginBottom: "48px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <div style={{ width: "30px", height: "30px", borderRadius: "7px", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>C</div>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "#e8f0ea", letterSpacing: "-0.02em" }}>Chronicle</span>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "#4a6b50", lineHeight: 1.7, maxWidth: "260px" }}>
              A space for curious minds. Long-form writing on technology, design, culture, and science.
            </p>
          </div>
          {[
            { title: "Explore", links: [{ href: "/", l: "Home" }, { href: "/blog", l: "Stories" }, { href: "/search", l: "Discover" }] },
            { title: "Account", links: [{ href: "/login", l: "Sign in" }, { href: "/signup", l: "Start writing" }, { href: "/dashboard", l: "Dashboard" }] },
            { title: "Company", links: [{ href: "#", l: "About" }, { href: "#", l: "Press" }, { href: "#", l: "Contact" }] },
          ].map(({ title, links }) => (
            <div key={title}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#3a5a40", marginBottom: "16px" }}>{title}</p>
              {links.map(({ href, l }) => (
                <Link key={l} href={href} style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "#5a7a60", textDecoration: "none", marginBottom: "10px", transition: "color 0.15s" }}>{l}</Link>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #1f3523", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#3a5a40" }}>© 2026 Chronicle. All rights reserved.</p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#2e4a34" }}>Made with craft & care ✦</p>
        </div>
      </div>
    </footer>
  );
}
