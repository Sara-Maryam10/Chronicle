import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#faf9f7" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "40px 48px", maxWidth: "900px" }}>
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
