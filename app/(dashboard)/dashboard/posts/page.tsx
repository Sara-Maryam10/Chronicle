"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PostTable from "@/components/dashboard/PostTable";
import { Toast, useToast } from "@/components/dashboard/Toast";

interface TablePost {
  id: string;
  title: string;
  status: "DRAFT" | "PUBLISHED";
  createdAt: string;
  publishedAt?: string | null;
  category?: { name: string } | null;
}

interface PostsResponse {
  posts?: TablePost[];
}

export default function PostsPage() {
  const [posts, setPosts] = useState<TablePost[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetch("/api/posts?mine=true")
      .then((r) => r.json())
      .then((d: PostsResponse) => setPosts(d.posts ?? []))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    // Uses /api/posts/by-id/[postId] DELETE route
    const res = await fetch(`/api/posts/by-id/${id}`, { method: "DELETE" });
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Post deleted.");
    } else {
      toast.error("Failed to delete post.");
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "36px" }}>
        <div>
          <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#1a1a18", marginBottom: "4px" }}>
            My Posts
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#9b9b97" }}>
            {loading ? "Loading…" : `${posts.length} total`}
          </p>
        </div>
        <Link href="/dashboard/posts/new" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 500, color: "#faf9f7", backgroundColor: "#1a1a18", textDecoration: "none", padding: "10px 22px", borderRadius: "6px" }}>
          + New post
        </Link>
      </div>

      {loading ? (
        <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#9b9b97", textAlign: "center", padding: "64px 0" }}>
          Loading posts…
        </div>
      ) : (
        <PostTable posts={posts} onDelete={handleDelete} />
      )}

      <Toast toasts={toast.toasts} onRemove={toast.removeToast} />
    </>
  );
}
