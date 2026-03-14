"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#faf9f7" }}>
        <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.5rem", color: "#9b9b97" }}>Chronicle</div>
      </div>
    );
  }

  if (!user) return null;
  return <>{children}</>;
}
