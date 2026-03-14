"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <main style={{ maxWidth: "600px", margin: "120px auto", padding: "0 24px", textAlign: "center" }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#eb5757", marginBottom: "20px" }}>Error</p>
      <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#1a1a18", marginBottom: "16px" }}>
        Something went wrong
      </h1>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.925rem", color: "#9b9b97", marginBottom: "32px" }}>
        {process.env.NODE_ENV === "development" ? error.message : "An unexpected error occurred."}
      </p>
      <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
        <button onClick={reset} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 500, color: "#faf9f7", backgroundColor: "#1a1a18", border: "none", padding: "12px 28px", borderRadius: "100px", cursor: "pointer" }}>
          Try again
        </button>
        <Link href="/" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#6b6b67", textDecoration: "none", padding: "12px 28px", border: "1px solid #e8e6e1", borderRadius: "100px" }}>
          Go home
        </Link>
      </div>
    </main>
  );
}
