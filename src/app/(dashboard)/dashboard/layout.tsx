// src/app/(dashbaord)/layout.tsx
"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { HiOutlineHome, HiOutlineUserGroup, HiOutlineCalendarDays } from "react-icons/hi2";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: any) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading]);

  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");
  if (loading)
    return <div className="p-10 text-center text-gray-400">Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between bg-white border-b border-[#46c2de] px-4 py-3">
        <p className="font-bold text-[#46c2de]">Schedula</p>
      </header>

      {/* Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-[#46c2de] p-6 space-y-6">
        <p className="text-xl font-bold text-[#46c2de]">Schedula</p>

        <nav className="flex flex-col gap-2">
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
          <Link
            href="/dashboard/appointments"
            className="text-gray-700 px-3 py-2 rounded-md hover:bg-[#46c2de]/10 transition"
          >
            Appointments
          </Link>

        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8">{children}</main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 z-50">

        <Link
          href="/dashboard"
          className={`flex flex-col items-center text-xs transition ${isActive("/dashboard")
            ? "text-[#46c2de]"
            : "text-gray-500"
            }`}
        >
          <HiOutlineHome className="w-6 h-6" />
          Home
        </Link>

        <Link
          href="/dashboard/doctors"
          className={`flex flex-col items-center text-xs transition ${isActive("/dashboard/doctors")
            ? "text-[#46c2de]"
            : "text-gray-500"
            }`}
        >
          <HiOutlineUserGroup className="w-6 h-6" />
          Doctors
        </Link>

        <Link
          href="/dashboard/appointments"
          className={`flex flex-col items-center text-xs transition ${isActive("/dashboard/appointments")
            ? "text-[#46c2de]"
            : "text-gray-500"
            }`}
        >
          <HiOutlineCalendarDays className="w-6 h-6" />
          Appointments
        </Link>

      </nav>
    </div>
  );
}