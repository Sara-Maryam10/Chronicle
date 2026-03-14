"use client";

import { useState, useEffect } from "react";
import { Toast, useToast } from "@/components/dashboard/Toast";
import { useAuth } from "@/context/AuthContext";

interface Category { id: string; name: string; slug: string; _count?: { posts: number }; }

export default function CategoriesPage() {
  const { user } = useAuth();
  const toast = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/categories").then((r) => r.json()).then((d) => setCategories(d.categories ?? [])).finally(() => setLoading(false));
  }, []);

  if (user?.role !== "ADMIN") {
    return (
      <div style={{ textAlign: "center", paddingTop: "80px" }}>
        <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.25rem", color: "#1a1a18", marginBottom: "8px" }}>Admin only</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#9b9b97" }}>Category management is restricted to administrators.</p>
      </div>
    );
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/categories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: newName }) });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Failed to add category."); return; }
      setCategories((prev) => [...prev, data.category]);
      setNewName("");
      toast.success(`Category "${data.category.name}" added.`);
    } catch { toast.error("Something went wrong."); }
    finally { setSaving(false); }
  };

  return (
    <>
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#1a1a18", marginBottom: "4px" }}>Categories</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#9b9b97" }}>{categories.length} total</p>
      </div>

      {/* Add form */}
      <div style={{ backgroundColor: "#fff", border: "1px solid #e8e6e1", borderRadius: "8px", padding: "24px", marginBottom: "32px" }}>
        <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#1a1a18", marginBottom: "16px" }}>Add new category</h2>
        <form onSubmit={handleAdd} style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Category name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{ flex: 1, padding: "10px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#1a1a18", border: "1px solid #e8e6e1", borderRadius: "6px", outline: "none" }}
          />
          <button
            type="submit"
            disabled={saving || !newName.trim()}
            style={{ padding: "10px 22px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 500, color: "#faf9f7", backgroundColor: "#1a1a18", border: "none", borderRadius: "6px", cursor: "pointer" }}
          >
            {saving ? "Adding…" : "Add"}
          </button>
        </form>
      </div>

      {/* List */}
      {loading ? (
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#9b9b97", textAlign: "center", padding: "32px 0" }}>Loading…</p>
      ) : (
        <div style={{ border: "1px solid #e8e6e1", borderRadius: "8px", overflow: "hidden" }}>
          {categories.map((cat, i) => (
            <div key={cat.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: i < categories.length - 1 ? "1px solid #f0ede8" : "none", backgroundColor: "#fff" }}>
              <div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.925rem", fontWeight: 500, color: "#1a1a18" }}>{cat.name}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.775rem", color: "#9b9b97", marginLeft: "12px" }}>/{cat.slug}</span>
              </div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#9b9b97" }}>
                {cat._count?.posts ?? 0} posts
              </span>
            </div>
          ))}
        </div>
      )}

      <Toast toasts={toast.toasts} onRemove={toast.removeToast} />
    </>
  );
}
