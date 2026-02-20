// src/app/(dashbaord)/layout.tsx
"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function DashboardLayout({ children }: any) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-60 bg-white border-r border-[#46c2de] p-5 space-y-6">
        <p className="text-xl font-bold text-[#46c2de]">Schedula</p>

        <nav className="flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="text-gray-700 px-3 py-2 rounded-md hover:bg-[#46c2de]/10 transition"
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/doctors"
            className="text-gray-700 px-3 py-2 rounded-md hover:bg-[#46c2de]/10 transition"
          >
            Doctors
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}