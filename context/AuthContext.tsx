"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import type { AuthUser } from "@/lib/types";

interface AuthContextValue {
  user:      AuthUser | null;
  isLoading: boolean;
  setUser:   (user: AuthUser) => void;
  logout:    () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,      setUserState] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount — restore session from JWT cookie via /api/auth/me
  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { user?: AuthUser } | null) => {
        if (data?.user) setUserState(data.user);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const setUser = useCallback((userData: AuthUser) => {
    setUserState(userData);
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUserState(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
