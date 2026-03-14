"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import ImageUpload from "@/components/dashboard/ImageUpload";
import { Toast, useToast } from "@/components/dashboard/Toast";

const Editor = dynamic(() => import("@/components/dashboard/Editor"), { ssr: false });

export default function NewPostPage() {
  const router = useRouter();
  const toast = useToast();
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([]);
  const [form, setForm] = useState({ title: "", excerpt: "", content: "", featuredImage: "", categoryId: "", status: "DRAFT" as "DRAFT" | "PUBLISHED" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/categories").then((r) => r.json()).then((d) => setCategories(d.categories ?? []));
  }, []);

  const slugPreview = form.title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");

  const handleSave = async (status: "DRAFT" | "PUBLISHED") => {
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Title and content are required.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Failed to save."); return; }
      toast.success(status === "PUBLISHED" ? "Post published!" : "Draft saved.");
      setTimeout(() => router.push("/dashboard/posts"), 800);
    } catch { toast.error("Something went wrong."); }
    finally { setSaving(false); }
  };

  const labelStyle: React.CSSProperties = { display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.825rem", fontWeight: 500, color: "#6b6b67", marginBottom: "6px" };
  const inputStyle: React.CSSProperties = { width: "100%", padding: "11px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#1a1a18", border: "1px solid #e8e6e1", borderRadius: "6px", outline: "none", backgroundColor: "#fff" };

  return (
    <>
      {/* Header bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "36px" }}>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#1a1a18" }}>
          New Post
        </h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => handleSave("DRAFT")} disabled={saving} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 400, color: "#6b6b67", border: "1px solid #e8e6e1", backgroundColor: "transparent", padding: "10px 20px", borderRadius: "6px", cursor: "pointer" }}>
            Save draft
          </button>
          <button onClick={() => handleSave("PUBLISHED")} disabled={saving} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 500, color: "#faf9f7", backgroundColor: "#1a1a18", border: "none", padding: "10px 24px", borderRadius: "6px", cursor: "pointer" }}>
            {saving ? "Publishing…" : "Publish"}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: "32px", alignItems: "start" }}>
        {/* Main */}
        <div>
          {/* Title */}
          <div style={{ marginBottom: "6px" }}>
            <input
              type="text"
              placeholder="Post title"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              style={{ ...inputStyle, fontSize: "1.5rem", fontFamily: "'Fraunces', Georgia, serif", fontWeight: 700, border: "none", borderBottom: "2px solid #e8e6e1", borderRadius: 0, padding: "8px 0", letterSpacing: "-0.02em" }}
            />
          </div>
          {form.title && (
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.775rem", color: "#9b9b97", marginBottom: "20px" }}>
              Slug: <code style={{ backgroundColor: "#f0ede8", padding: "1px 5px", borderRadius: "3px" }}>{slugPreview}</code>
            </p>
          )}

          {/* Excerpt */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Excerpt (optional)</label>
            <textarea
              placeholder="A short description shown on post cards…"
              value={form.excerpt}
              onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
              rows={2}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          {/* Editor */}
          <div>
            <label style={labelStyle}>Content</label>
            <Editor content={form.content} onChange={(html) => setForm((p) => ({ ...p, content: html }))} />
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Category */}
          <div style={{ backgroundColor: "#fff", border: "1px solid #e8e6e1", borderRadius: "8px", padding: "20px" }}>
            <label style={labelStyle}>Category</label>
            <select
              value={form.categoryId}
              onChange={(e) => setForm((p) => ({ ...p, categoryId: e.target.value }))}
              style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
            >
              <option value="">No category</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          {/* Status toggle */}
          <div style={{ backgroundColor: "#fff", border: "1px solid #e8e6e1", borderRadius: "8px", padding: "20px" }}>
            <label style={labelStyle}>Status</label>
            <div style={{ display: "flex", gap: "8px" }}>
              {(["DRAFT", "PUBLISHED"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setForm((p) => ({ ...p, status: s }))}
                  style={{ flex: 1, padding: "8px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: form.status === s ? 500 : 400, color: form.status === s ? "#faf9f7" : "#6b6b67", backgroundColor: form.status === s ? "#1a1a18" : "transparent", border: "1px solid", borderColor: form.status === s ? "#1a1a18" : "#e8e6e1", borderRadius: "5px", cursor: "pointer" }}
                >
                  {s === "DRAFT" ? "Draft" : "Published"}
                </button>
              ))}
            </div>
          </div>

          {/* Featured image */}
          <div style={{ backgroundColor: "#fff", border: "1px solid #e8e6e1", borderRadius: "8px", padding: "20px" }}>
            <label style={{ ...labelStyle, marginBottom: "12px" }}>Featured image</label>
            <ImageUpload value={form.featuredImage} onChange={(url) => setForm((p) => ({ ...p, featuredImage: url ?? "" }))} />
          </div>
        </div>
      </div>

      <Toast toasts={toast.toasts} onRemove={toast.removeToast} />
    </>
  );
}
