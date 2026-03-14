"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top topic ticker */}
      <div style={{ background: "var(--bg-dark)", color: "#a8c5ad", height: "34px", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <div style={{ overflow: "hidden", flex: 1 }}>
          <div className="marquee-track" style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", gap: "0" }}>
            {["✦  Technology & Society  ✦  The Science of Sleep  ✦  Building Better Products  ✦  Climate & Innovation  ✦  The Art of Deep Work  ✦  AI & Creativity  ✦  Long-Form Reads  ✦  Design Thinking  ✦  Technology & Society  ✦  The Science of Sleep  ✦  Building Better Products  ✦  Climate & Innovation  ✦  The Art of Deep Work  ✦  AI & Creativity  ",
              "✦  Technology & Society  ✦  The Science of Sleep  ✦  Building Better Products  ✦  Climate & Innovation  ✦  The Art of Deep Work  ✦  AI & Creativity  ✦  Long-Form Reads  ✦  Design Thinking  ✦  Technology & Society  ✦  The Science of Sleep  ✦  Building Better Products  ✦  Climate & Innovation  ✦  The Art of Deep Work  ✦  AI & Creativity  "
            ].map((t, i) => <span key={i} style={{ paddingRight: "2rem" }}>{t}</span>)}
          </div>
        </div>
      </div>

      <header style={{
        borderBottom: `1px solid ${scrolled ? "var(--border)" : "var(--border)"}`,
        backgroundColor: scrolled ? "rgba(250,248,243,0.97)" : "var(--bg)",
        backdropFilter: "blur(10px)",
        position: "sticky", top: 0, zIndex: 50,
        transition: "box-shadow 0.2s ease",
        boxShadow: scrolled ? "0 2px 20px rgba(26,31,27,0.08)" : "none",
      }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 28px", height: "66px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "#fff", boxShadow: "0 2px 6px rgba(45,106,79,0.35)" }}>C</div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 700, color: "var(--fg)", letterSpacing: "-0.02em" }}>Chronicle</span>
          </Link>

          {/* Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            {[{ href: "/", label: "Home" }, { href: "/blog", label: "Stories" }, { href: "/search", label: "Discover" }].map(({ href, label }) => (
              <Link key={href} href={href} style={{
                fontFamily: "var(--font-body)", fontSize: "0.9rem",
                fontWeight: pathname === href ? 700 : 500,
                color: pathname === href ? "var(--accent)" : "var(--fg-muted)",
                textDecoration: "none",
                transition: "color 0.15s",
                borderBottom: pathname === href ? "2px solid var(--accent)" : "2px solid transparent",
                paddingBottom: "2px",
              }}>{label}</Link>
            ))}
          </nav>

          {/* CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/login" style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 500, color: "var(--fg-muted)", textDecoration: "none" }}>Sign in</Link>
            <Link href="/signup" className="btn-primary" style={{ padding: "9px 22px", borderRadius: "100px", fontSize: "0.875rem" }}>Get started</Link>
          </div>
        </div>
      </header>
    </>
  );
}
