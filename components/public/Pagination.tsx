import Link from "next/link";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
}

export default function Pagination({ currentPage = 1, totalPages = 3 }: PaginationProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        marginTop: "64px",
        paddingTop: "32px",
        borderTop: "1px solid #e8e6e1",
      }}
    >
      <Link
        href="#"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.875rem",
          color: currentPage === 1 ? "#c8c5bf" : "#1a1a18",
          textDecoration: "none",
          padding: "8px 16px",
          borderRadius: "4px",
          border: "1px solid #e8e6e1",
          pointerEvents: currentPage === 1 ? "none" : "auto",
          transition: "background 0.15s ease",
        }}
      >
        ← Previous
      </Link>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={`?page=${page}`}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.875rem",
            fontWeight: page === currentPage ? 600 : 400,
            color: page === currentPage ? "#faf9f7" : "#6b6b67",
            backgroundColor: page === currentPage ? "#1a1a18" : "transparent",
            textDecoration: "none",
            padding: "8px 14px",
            borderRadius: "4px",
            border: "1px solid",
            borderColor: page === currentPage ? "#1a1a18" : "#e8e6e1",
            transition: "all 0.15s ease",
            minWidth: "40px",
            textAlign: "center",
          }}
        >
          {page}
        </Link>
      ))}

      <Link
        href="#"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.875rem",
          color: "#1a1a18",
          textDecoration: "none",
          padding: "8px 16px",
          borderRadius: "4px",
          border: "1px solid #e8e6e1",
          transition: "background 0.15s ease",
        }}
      >
        Next →
      </Link>
    </div>
  );
}
