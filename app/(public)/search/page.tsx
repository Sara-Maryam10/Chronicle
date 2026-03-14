"use client";

import { useState, useMemo } from "react";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import PostCard from "@/components/public/PostCard";
import { posts, categories } from "@/lib/mock";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const results = useMemo(() => {
    return posts.filter((post) => {
      const matchesQuery =
        !query ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.author.toLowerCase().includes(query.toLowerCase());

      const matchesCategory = !activeCategory || post.categorySlug === activeCategory;

      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  return (
    <>
      <Header />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 24px 0" }}>
        {/* Search header */}
        <div style={{ maxWidth: "640px", margin: "0 auto 48px", textAlign: "center" }}>
          <h1
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: "2.5rem",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#1a1a18",
              marginBottom: "8px",
            }}
          >
            Search stories
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.925rem",
              color: "#9b9b97",
              marginBottom: "32px",
            }}
          >
            Find ideas that matter to you
          </p>

          {/* Search input */}
          <div style={{ position: "relative", marginBottom: "20px" }}>
            <span
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9b9b97",
                fontSize: "1rem",
                pointerEvents: "none",
              }}
            >
              ⌕
            </span>
            <input
              type="text"
              placeholder="Search by title, author, or topic..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 20px 14px 44px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "#1a1a18",
                backgroundColor: "#ffffff",
                border: "1px solid #e8e6e1",
                borderRadius: "8px",
                outline: "none",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                transition: "border-color 0.15s ease, box-shadow 0.15s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#1a1a18";
                e.target.style.boxShadow = "0 0 0 3px rgba(26,26,24,0.08)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e8e6e1";
                e.target.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
              }}
            />
          </div>

          {/* Category filters */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
            <button
              onClick={() => setActiveCategory(null)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.825rem",
                fontWeight: !activeCategory ? 500 : 400,
                color: !activeCategory ? "#faf9f7" : "#6b6b67",
                backgroundColor: !activeCategory ? "#1a1a18" : "#f0ede8",
                border: "none",
                padding: "7px 16px",
                borderRadius: "100px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(activeCategory === cat.slug ? null : cat.slug)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.825rem",
                  fontWeight: activeCategory === cat.slug ? 500 : 400,
                  color: activeCategory === cat.slug ? "#faf9f7" : "#6b6b67",
                  backgroundColor: activeCategory === cat.slug ? "#1a1a18" : "#f0ede8",
                  border: "none",
                  padding: "7px 16px",
                  borderRadius: "100px",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          {/* Results count */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.825rem",
              color: "#9b9b97",
              marginBottom: "24px",
              paddingBottom: "24px",
              borderBottom: "1px solid #e8e6e1",
            }}
          >
            {query || activeCategory
              ? `${results.length} ${results.length === 1 ? "result" : "results"}${query ? ` for "${query}"` : ""}`
              : `${results.length} stories`}
          </p>

          {results.length === 0 ? (
            <div style={{ textAlign: "center", padding: "64px 0" }}>
              <p
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: "1.5rem",
                  color: "#1a1a18",
                  marginBottom: "12px",
                }}
              >
                No results found
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#9b9b97", fontSize: "0.925rem" }}>
                Try a different search term or browse all stories
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {results.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
