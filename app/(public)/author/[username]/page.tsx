import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import PostCard from "@/components/public/PostCard";
import { posts } from "@/lib/mock";

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const authorPosts = posts.filter(
    (post) =>
      (post.authorUsername || post.author.toLowerCase().replace(" ", "")) === username
  );

  const authorName = authorPosts[0]?.author || username;
  const totalReadingTime = authorPosts.reduce((acc, p) => {
    const mins = parseInt(p.readingTime || "0");
    return acc + (isNaN(mins) ? 0 : mins);
  }, 0);

  return (
    <>
      <Header />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        {/* Author hero */}
        <div
          style={{
            paddingTop: "64px",
            paddingBottom: "48px",
            borderBottom: "1px solid #e8e6e1",
            marginBottom: "56px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "24px" }}>
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                backgroundColor: "#1a1a18",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "#faf9f7",
                flexShrink: 0,
              }}
            >
              {authorName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1
                style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: "2rem",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  color: "#1a1a18",
                  marginBottom: "6px",
                }}
              >
                {authorName}
              </h1>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  color: "#9b9b97",
                }}
              >
                {authorPosts.length} {authorPosts.length === 1 ? "story" : "stories"}
                {totalReadingTime > 0 && ` · ${totalReadingTime} min total reading time`}
              </p>
            </div>
          </div>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
              lineHeight: 1.65,
              color: "#6b6b67",
              maxWidth: "520px",
            }}
          >
            Writer at Chronicle exploring ideas across{" "}
            {[...new Set(authorPosts.map((p) => p.category).filter(Boolean))].join(", ") || "multiple topics"}.
          </p>
        </div>

        {authorPosts.length === 0 ? (
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#9b9b97", textAlign: "center", padding: "64px 0" }}>
            No stories published yet.
          </p>
        ) : (
          <div style={{ maxWidth: "680px" }}>
            {authorPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
