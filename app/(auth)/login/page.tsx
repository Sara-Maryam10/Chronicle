"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Invalid email or password"); return; }
      setUser(data.user);
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div style={{ background: "var(--bg-dark)", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "52px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 60% 40%, rgba(45,106,79,0.18) 0%, transparent 60%)", pointerEvents: "none" }} />
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", position: "relative", zIndex: 1 }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, color: "#fff", fontSize: "1rem" }}>C</div>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700, color: "#e8f0ea", letterSpacing: "-0.02em" }}>Chronicle</span>
        </Link>
        <div style={{ position: "relative", zIndex: 1 }}>
          <blockquote style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 600, color: "#c8deca", lineHeight: 1.3, letterSpacing: "-0.02em", marginBottom: "18px", fontStyle: "italic" }}>
            &quot;Good writing is clear thinking made visible.&quot;
          </blockquote>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--fg-muted)" }}>— Bill Wheeler</p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "64px 72px", background: "var(--bg)" }}>
        <div style={{ maxWidth: "380px", width: "100%" }}>
          <span className="tag-amber" style={{ padding: "4px 14px", marginBottom: "18px", display: "inline-block" }}>Welcome back</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 700, color: "var(--fg)", letterSpacing: "-0.03em", marginBottom: "36px", lineHeight: 1.15 }}>
            Sign in to Chronicle
          </h1>
          {error && (
            <div style={{ padding: "12px 16px", border: "1px solid #f0c0b0", background: "#fff8f6", borderRadius: "8px", fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "#c0392b", marginBottom: "22px" }}>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginBottom: "26px" }}>
              <div>
                <label style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.05em", color: "var(--fg-muted)", display: "block", marginBottom: "8px", textTransform: "uppercase" }}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" className="input-field" style={{ padding: "12px 15px" }} required />
              </div>
              <div>
                <label style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.05em", color: "var(--fg-muted)", display: "block", marginBottom: "8px", textTransform: "uppercase" }}>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="input-field" style={{ padding: "12px 15px" }} required />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ width: "100%", padding: "14px", borderRadius: "100px", fontSize: "0.9rem", opacity: loading ? 0.7 : 1 }}>
              {loading ? "Signing in…" : "Sign in →"}
            </button>
          </form>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--fg-muted)", textAlign: "center", marginTop: "22px" }}>
            No account?{" "}
            <Link href="/signup" style={{ color: "var(--accent)", fontWeight: 700, textDecoration: "none", borderBottom: "1.5px solid var(--accent)" }}>Start writing free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
