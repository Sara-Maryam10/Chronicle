"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: "⊞" },
  { href: "/dashboard/posts", label: "My Posts", icon: "≡" },
  { href: "/dashboard/posts/new", label: "New Post", icon: "+" },
];

const adminItems = [
  { href: "/dashboard/categories", label: "Categories", icon: "⊕" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const NavLink = ({ href, label, icon }: { href: string; label: string; icon: string }) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 16px",
          borderRadius: "6px",
          backgroundColor: active ? "#f0ede8" : "transparent",
          color: active ? "#1a1a18" : "#6b6b67",
          textDecoration: "none",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.875rem",
          fontWeight: active ? 500 : 400,
          transition: "all 0.15s ease",
          marginBottom: "2px",
        }}
      >
        <span style={{ fontSize: "1rem", width: "20px", textAlign: "center" }}>{icon}</span>
        {label}
      </Link>
    );
  };

  return (
    <aside
      style={{
        width: "220px",
        flexShrink: 0,
        borderRight: "1px solid #e8e6e1",
        minHeight: "calc(100vh - 64px)",
        padding: "32px 16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "sticky",
        top: "64px",
      }}
    >
      <div>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "block", marginBottom: "32px", paddingLeft: "16px" }}>
          <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: "#1a1a18" }}>
            Chronicle
          </span>
        </Link>

        <nav>
          {navItems.map((item) => <NavLink key={item.href} {...item} />)}

          {user?.role === "ADMIN" && (
            <>
              <div style={{ height: "1px", backgroundColor: "#e8e6e1", margin: "16px 0" }} />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9b9b97", paddingLeft: "16px", marginBottom: "8px" }}>
                Admin
              </p>
              {adminItems.map((item) => <NavLink key={item.href} {...item} />)}
            </>
          )}
        </nav>
      </div>

      {/* User + logout */}
      <div>
        <div style={{ height: "1px", backgroundColor: "#e8e6e1", marginBottom: "16px" }} />
        {user && (
          <div style={{ padding: "10px 16px", marginBottom: "8px" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", fontWeight: 500, color: "#1a1a18", marginBottom: "2px" }}>
              {user.name}
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.775rem", color: "#9b9b97" }}>
              {user.role}
            </p>
          </div>
        )}
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "10px 16px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "transparent",
            color: "#9b9b97",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.875rem",
            textAlign: "left",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span>↩</span> Sign out
        </button>
      </div>
    </aside>
  );
}
