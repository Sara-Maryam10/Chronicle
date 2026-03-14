"use client";

import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

const ICONS = { success: "✓", error: "✕", info: "i" };
const COLORS = {
  success: { bg: "#1a1a18", border: "#333", icon: "#6fcf97" },
  error: { bg: "#1a1a18", border: "#333", icon: "#eb5757" },
  info: { bg: "#1a1a18", border: "#333", icon: "#9b9b97" },
};

export function Toast({ toasts, onRemove }: ToastProps) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: ToastMessage; onRemove: (id: string) => void }) {
  const [visible, setVisible] = useState(false);
  const colors = COLORS[toast.type];

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onRemove(toast.id), 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        backgroundColor: colors.bg,
        border: `1px solid ${colors.border}`,
        borderRadius: "8px",
        padding: "12px 16px",
        minWidth: "280px",
        maxWidth: "380px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(24px)",
        transition: "opacity 0.25s ease, transform 0.25s ease",
        cursor: "pointer",
      }}
      onClick={() => onRemove(toast.id)}
    >
      <span
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: colors.icon,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.7rem",
          fontWeight: 700,
          flexShrink: 0,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {ICONS[toast.type]}
      </span>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.875rem",
          color: "#faf9f7",
          lineHeight: 1.4,
        }}
      >
        {toast.message}
      </span>
    </div>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  return { toasts, removeToast, success: (m: string) => addToast(m, "success"), error: (m: string) => addToast(m, "error"), info: (m: string) => addToast(m, "info") };
}
