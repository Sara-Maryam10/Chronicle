"use client";

import Link from "next/link";
import { useState } from "react";

interface TablePost {
  id: string;
  title: string;
  status: "DRAFT" | "PUBLISHED";
  createdAt: string;
  publishedAt?: string | null;
  category?: { name: string } | null;
}

interface PostTableProps {
  posts: TablePost[];
  onDelete: (id: string) => Promise<void>;
}

const statusStyle = {
  PUBLISHED: { bg: "#e8f5e9", color: "#2e7d32", label: "Published" },
  DRAFT: { bg: "#f5f5f5", color: "#757575", label: "Draft" },
};

export default function PostTable({ posts, onDelete }: PostTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await onDelete(id);
    setDeletingId(null);
    setConfirmId(null);
  };

  if (posts.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "64px 0" }}>
        <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.25rem", color: "#1a1a18", marginBottom: "8px" }}>
          No posts yet
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#9b9b97", marginBottom: "24px" }}>
          Create your first post to get started.
        </p>
        <Link
          href="/dashboard/posts/new"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#faf9f7", backgroundColor: "#1a1a18", textDecoration: "none", padding: "10px 24px", borderRadius: "100px" }}
        >
          Write something
        </Link>
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #e8e6e1" }}>
            {["Title", "Status", "Category", "Date", "Actions"].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  padding: "12px 16px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#9b9b97",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            const s = statusStyle[post.status];
            return (
              <tr key={post.id} style={{ borderBottom: "1px solid #f0ede8" }}>
                <td style={{ padding: "14px 16px", maxWidth: "360px" }}>
                  <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "0.95rem", fontWeight: 600, color: "#1a1a18", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {post.title}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 500, color: s.color, backgroundColor: s.bg, padding: "3px 10px", borderRadius: "100px" }}>
                    {s.label}
                  </span>
                </td>
                <td style={{ padding: "14px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#6b6b67" }}>
                  {post.category?.name || "—"}
                </td>
                <td style={{ padding: "14px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#9b9b97", whiteSpace: "nowrap" }}>
                  {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Link
                      href={`/dashboard/posts/${post.id}/edit`}
                      style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#1a1a18", textDecoration: "none", padding: "5px 12px", border: "1px solid #e8e6e1", borderRadius: "4px" }}
                    >
                      Edit
                    </Link>
                    {confirmId === post.id ? (
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          onClick={() => handleDelete(post.id)}
                          disabled={deletingId === post.id}
                          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#faf9f7", backgroundColor: "#eb5757", border: "none", padding: "5px 12px", borderRadius: "4px", cursor: "pointer" }}
                        >
                          {deletingId === post.id ? "..." : "Confirm"}
                        </button>
                        <button
                          onClick={() => setConfirmId(null)}
                          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#6b6b67", backgroundColor: "transparent", border: "1px solid #e8e6e1", padding: "5px 12px", borderRadius: "4px", cursor: "pointer" }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmId(post.id)}
                        style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#9b9b97", backgroundColor: "transparent", border: "1px solid #e8e6e1", padding: "5px 12px", borderRadius: "4px", cursor: "pointer" }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
