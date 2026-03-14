"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import ImageUpload from "@/components/dashboard/ImageUpload";
import { Toast, useToast } from "@/components/dashboard/Toast";

const Editor = dynamic(() => import("@/components/dashboard/Editor"), { ssr: false });

interface Category { id: string; name: string; }

interface PostData {
  title: string;
  excerpt?: string | null;
  content: string;
  featuredImage?: string | null;
  categoryId?: string | null;
  status: "DRAFT" | "PUBLISHED";
}

interface ApiPostResponse  { post?: PostData; error?: string; }
interface ApiCatsResponse  { categories?: Category[]; }

type FormStatus = "DRAFT" | "PUBLISHED";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const toast  = useToast();
  const [postId,     setPostId]     = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({
    title: "", excerpt: "", content: "",
    featuredImage: "", categoryId: "", status: "DRAFT" as FormStatus,
  });
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);

  useEffect(() => {
    params.then(({ id }) => {
      setPostId(id);
      Promise.all([
        // Use slug route to fetch by slug, or by-id route to fetch by id
        fetch(`/api/posts/by-id/${id}`).then((r) => r.json()) as Promise<ApiPostResponse>,
        fetch("/api/categories").then((r)  => r.json()) as Promise<ApiCatsResponse>,
      ]).then(([postData, catData]) => {
        if (postData.post) {
          const p = postData.post;
          setForm({
            title:         p.title,
            excerpt:       p.excerpt       ?? "",
            content:       p.content,
            featuredImage: p.featuredImage ?? "",
            categoryId:    p.categoryId    ?? "",
            status:        p.status,
          });
        }
        setCategories(catData.categories ?? []);
      }).finally(() => setLoading(false));
    });
  }, [params]);

  const handleSave = async (status: FormStatus) => {
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Title and content are required.");
      return;
    }
    setSaving(true);
    try {
      const res  = await fetch(`/api/posts/by-id/${postId}`, {
        method:  "PUT",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ ...form, status }),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) { toast.error(data.error || "Failed to save."); return; }
      toast.success("Changes saved.");
      setTimeout(() => router.push("/dashboard/posts"), 800);
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const labelStyle: React.CSSProperties = { display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.825rem", fontWeight: 500, color: "#6b6b67", marginBottom: "6px" };
  const inputStyle: React.CSSProperties = { width: "100%", padding: "11px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#1a1a18", border: "1px solid #e8e6e1", borderRadius: "6px", outline: "none", backgroundColor: "#fff" };

  if (loading) return <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#9b9b97", textAlign: "center", paddingTop: "80px" }}>Loading post…</div>;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "36px" }}>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#1a1a18" }}>Edit Post</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => handleSave("DRAFT")} disabled={saving} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#6b6b67", border: "1px solid #e8e6e1", backgroundColor: "transparent", padding: "10px 20px", borderRadius: "6px", cursor: "pointer" }}>Save draft</button>
          <button onClick={() => handleSave("PUBLISHED")} disabled={saving} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 500, color: "#faf9f7", backgroundColor: "#1a1a18", border: "none", padding: "10px 24px", borderRadius: "6px", cursor: "pointer" }}>
            {saving ? "Saving…" : "Save & Publish"}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: "32px", alignItems: "start" }}>
        <div>
          <div style={{ marginBottom: "20px" }}>
            <input type="text" placeholder="Post title" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} style={{ ...inputStyle, fontSize: "1.5rem", fontFamily: "'Fraunces', Georgia, serif", fontWeight: 700, border: "none", borderBottom: "2px solid #e8e6e1", borderRadius: 0, padding: "8px 0" }} />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Excerpt</label>
            <textarea placeholder="Short description…" value={form.excerpt} onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))} rows={2} style={{ ...inputStyle, resize: "vertical" }} />
          </div>
          <div>
            <label style={labelStyle}>Content</label>
            <Editor content={form.content} onChange={(html) => setForm((p) => ({ ...p, content: html }))} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ backgroundColor: "#fff", border: "1px solid #e8e6e1", borderRadius: "8px", padding: "20px" }}>
            <label style={labelStyle}>Category</label>
            <select value={form.categoryId} onChange={(e) => setForm((p) => ({ ...p, categoryId: e.target.value }))} style={{ ...inputStyle, cursor: "pointer" }}>
              <option value="">No category</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div style={{ backgroundColor: "#fff", border: "1px solid #e8e6e1", borderRadius: "8px", padding: "20px" }}>
            <label style={labelStyle}>Status</label>
            <div style={{ display: "flex", gap: "8px" }}>
              {(["DRAFT", "PUBLISHED"] as const).map((s) => (
                <button key={s} onClick={() => setForm((p) => ({ ...p, status: s }))} style={{ flex: 1, padding: "8px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: form.status === s ? 500 : 400, color: form.status === s ? "#faf9f7" : "#6b6b67", backgroundColor: form.status === s ? "#1a1a18" : "transparent", border: "1px solid", borderColor: form.status === s ? "#1a1a18" : "#e8e6e1", borderRadius: "5px", cursor: "pointer" }}>
                  {s === "DRAFT" ? "Draft" : "Published"}
                </button>
              ))}
            </div>
          </div>
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
