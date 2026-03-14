"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface FormState {
  name: string;
  username: string;
  email: string;
  password: string;
}

export default function SignupPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [form, setForm] = useState<FormState>({ name: "", username: "", email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.issues) {
          const fieldErrors: Record<string, string> = {};
          (data.issues as { field: string; message: string }[]).forEach((i) => {
            fieldErrors[i.field] = i.message;
          });
          setErrors(fieldErrors);
        } else {
          setApiError(data.error || "Signup failed");
        }
        return;
      }

      setUser(data.user);
      router.push("/dashboard");
    } catch {
      setApiError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px",
    fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#1a1a18",
    border: "1px solid #e8e6e1", borderRadius: "6px", outline: "none", backgroundColor: "#fff",
  };

  const fields: { field: keyof FormState; label: string; type?: string; placeholder: string }[] = [
    { field: "name",     label: "Full name", placeholder: "Ada Lovelace" },
    { field: "username", label: "Username",  placeholder: "adalovelace" },
    { field: "email",    label: "Email",     type: "email",    placeholder: "you@example.com" },
    { field: "password", label: "Password",  type: "password", placeholder: "At least 8 characters" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#faf9f7", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "2rem", fontWeight: 700, color: "#1a1a18" }}>Chronicle</span>
          </Link>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.925rem", color: "#9b9b97", marginTop: "8px" }}>Create your account</p>
        </div>

        <div style={{ backgroundColor: "#fff", border: "1px solid #e8e6e1", borderRadius: "12px", padding: "36px" }}>
          {apiError && (
            <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "6px", padding: "12px 16px", marginBottom: "20px" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#eb5757" }}>{apiError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {fields.map(({ field, label, type = "text", placeholder }) => (
              <div key={field} style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.825rem", fontWeight: 500, color: "#1a1a18", marginBottom: "6px" }}>
                  {label}
                </label>
                <input
                  type={type}
                  value={form[field]}
                  onChange={set(field)}
                  required
                  placeholder={placeholder}
                  style={{ ...inputStyle, borderColor: errors[field] ? "#eb5757" : "#e8e6e1" }}
                />
                {errors[field] && (
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.775rem", color: "#eb5757", marginTop: "4px" }}>{errors[field]}</p>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "13px", marginTop: "12px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: 500, color: "#faf9f7", backgroundColor: loading ? "#6b6b67" : "#1a1a18", border: "none", borderRadius: "6px", cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#9b9b97", marginTop: "20px" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#1a1a18", textDecoration: "none", borderBottom: "1px solid #e8e6e1" }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
