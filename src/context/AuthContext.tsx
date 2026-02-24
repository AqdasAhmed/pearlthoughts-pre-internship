"use client";
import { createContext, useContext, useEffect, useState } from "react";

type User = { email: string; role: string } | null;

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);
  
  const signup = (email: string, password: string) => {
    const newUser = { email, password, role: "patient" };

    localStorage.setItem("users", JSON.stringify([newUser]));
    localStorage.setItem("session", JSON.stringify({ email, role: "patient" }));

    setUser({ email, role: "patient" });
  };

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const found = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!found) return false;

    const session = { email: found.email, role: found.role };
    localStorage.setItem("session", JSON.stringify(session));
    setUser(session);

    return true;
  };

  const logout = () => {
    localStorage.removeItem("session");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);