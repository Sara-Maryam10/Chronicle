"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

interface Stats { total: number; published: number; draft: number; }
interface PostItem { status: string; }

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({ total: 0, published: 0, draft: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts?mine=true")
      .then((r) => r.json())
      .then((data: { posts?: PostItem[] }) => {
        const all = data.posts ?? [];
        setStats({
          total:     all.length,
          published: all.filter((p) => p.status === "PUBLISHED").length,
          draft:     all.filter((p) => p.status === "DRAFT").length,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const StatCard = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <div style={{ backgroundColor: "#fff", border: "1px solid #e8e6e1", borderRadius: "8px", padding: "24px 28px" }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9b9b97", marginBottom: "12px" }}>{label}</p>
      {loading
        ? <div style={{ height: "32px", width: "60px", backgroundColor: "#f0ede8", borderRadius: "4px" }} />
        : <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "2.25rem", fontWeight: 700, color, lineHeight: 1 }}>{value}</p>
      }
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#1a1a18", marginBottom: "6px" }}>
          Good morning{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.925rem", color: "#9b9b97" }}>
          Here&apos;s what&apos;s happening with your writing.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "48px" }}>
        <StatCard label="Total posts"  value={stats.total}     color="#1a1a18" />
        <StatCard label="Published"    value={stats.published} color="#2e7d32" />
        <StatCard label="Drafts"       value={stats.draft}     color="#9b9b97" />
      </div>

      <div>
        <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9b9b97", marginBottom: "16px" }}>
          Quick actions
        </h2>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link href="/dashboard/posts/new" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 500, color: "#faf9f7", backgroundColor: "#1a1a18", textDecoration: "none", padding: "12px 24px", borderRadius: "6px" }}>
            Write new post
          </Link>
          <Link href="/dashboard/posts" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#1a1a18", border: "1px solid #e8e6e1", textDecoration: "none", padding: "12px 24px", borderRadius: "6px" }}>
            Manage posts
          </Link>
          <Link href="/blog" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#6b6b67", textDecoration: "none", padding: "12px 24px", border: "1px solid #e8e6e1", borderRadius: "6px" }}>
            View blog →
          </Link>
        </div>
      </div>
    </div>
  );
}
