"use client";

const shimmerStyle: React.CSSProperties = {
  background: "linear-gradient(90deg, #f0ede8 25%, #e8e5e0 50%, #f0ede8 75%)",
  backgroundSize: "800px 100%",
  animation: "shimmer 1.6s infinite linear",
  borderRadius: "4px",
};

export function SkeletonBlock({ width = "100%", height = "16px" }: { width?: string; height?: string }) {
  return (
    <>
      <style>{`@keyframes shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }`}</style>
      <div style={{ ...shimmerStyle, width, height }} />
    </>
  );
}

export function SkeletonCard() {
  return (
    <div style={{ padding: "24px 0", borderBottom: "1px solid #e8e6e1" }}>
      <style>{`@keyframes shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }`}</style>
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px", alignItems: "center" }}>
        <div style={{ ...shimmerStyle, width: "24px", height: "24px", borderRadius: "50%" }} />
        <div style={{ ...shimmerStyle, width: "100px", height: "14px" }} />
      </div>
      <div style={{ ...shimmerStyle, width: "80%", height: "20px", marginBottom: "10px" }} />
      <div style={{ ...shimmerStyle, width: "60%", height: "20px", marginBottom: "16px" }} />
      <div style={{ ...shimmerStyle, width: "90%", height: "14px", marginBottom: "6px" }} />
      <div style={{ ...shimmerStyle, width: "70%", height: "14px" }} />
    </div>
  );
}

export function SkeletonTableRow() {
  return (
    <tr>
      <style>{`@keyframes shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }`}</style>
      {[60, 15, 12, 13].map((w, i) => (
        <td key={i} style={{ padding: "14px 16px" }}>
          <div style={{ ...shimmerStyle, width: `${w}%`, height: "14px" }} />
        </td>
      ))}
    </tr>
  );
}
