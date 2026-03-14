import Link from "next/link";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: "600px", margin: "120px auto", padding: "0 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9b9b97", marginBottom: "20px" }}>
          404
        </p>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#1a1a18", marginBottom: "16px" }}>
          Page not found
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#9b9b97", lineHeight: 1.65, marginBottom: "40px" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <Link href="/" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 500, color: "#faf9f7", backgroundColor: "#1a1a18", textDecoration: "none", padding: "12px 28px", borderRadius: "100px" }}>
            Go home
          </Link>
          <Link href="/blog" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#6b6b67", textDecoration: "none", padding: "12px 28px", border: "1px solid #e8e6e1", borderRadius: "100px" }}>
            Browse stories
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
