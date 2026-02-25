"use client";

import { useEffect, useState, useRef } from "react";
import { HiOutlineCalendarDays, HiOutlineClock, HiOutlineVideoCamera, HiOutlineBuildingOffice2, HiOutlinePhone, HiEllipsisVertical, HiOutlinePencilSquare, HiOutlineEye, HiOutlineXMark } from "react-icons/hi2";
import Link from "next/link";
import { useRouter } from "next/navigation";

type AppointmentStatus = "upcoming" | "completed" | "missed" | "cancelled";

type Appointment = {
  id: string;
  doctor: string;
  specialization: string;
  date: string;
  time: string;
  mode?: string;
  problem?: string;
  patientName?: string;
  age?: string;
  gender?: string;
  phone?: string;
  bloodGroup?: string;
  conditions?: string;
  status?: "upcoming" | "completed" | "missed" | "cancelled";
};

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // Load from localStorage
  useEffect(() => {
    const stored: Appointment[] = JSON.parse(localStorage.getItem("appointments") || "[]");
    setAppointments(stored);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // if click inside any menu OR menu button → ignore
      if (target.closest("[data-menu]")) return;

      setOpenMenu(null);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const getComputedStatus = (a: Appointment): AppointmentStatus => {
    if (a.status === "cancelled") return "cancelled";
    if (a.status === "completed") return "completed";

    const appointmentTime = new Date(`${a.date} ${a.time}`).getTime();
    const now = Date.now();

    if (appointmentTime < now) return "missed";
    return "upcoming";
  };

  const [tab, setTab] = useState<"all" | "upcoming" | "completed" | "cancelled" | "missed">("all");

  // Cancel appointment
  const cancelAppointment = (id: string) => {
    const updated = appointments.map(a =>
      a.id === id ? { ...a, status: "cancelled" as const } : a
    );

    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  appointments.sort((a, b) =>
    new Date(a.date + " " + a.time).getTime() -
    new Date(b.date + " " + b.time).getTime()
  );

  const filteredAppointments = appointments.filter(a => {
    if (tab === "all") return true;
    return getComputedStatus(a) === tab;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        My Appointments
      </h1>

      {appointments.length === 0 && (
        <div className="bg-white border rounded-xl p-6 text-gray-500">
          No appointments booked yet.
        </div>
      )}

      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          ["all", "All"],
          ["upcoming", "Upcoming"],
          ["completed", "Completed"],
          ["missed", "Missed"],
          ["cancelled", "Cancelled"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key as any)}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap border transition
        ${tab === key
                ? "bg-[#46c2de] text-white border-[#46c2de]"
                : "bg-white text-gray-600 border-gray-300 hover:border-[#46c2de]"
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredAppointments.map((a, index) => {
          const computedStatus = getComputedStatus(a);
          return (
            <div
              key={a.id}
              className="relative bg-white border border-[#46c2de] rounded-xl p-5 shadow-sm flex flex-col gap-3"
            >
              <div className="space-y-2">
                <p className="font-semibold text-gray-800">{a.doctor}</p>
                <p className="text-sm text-gray-500">{a.specialization}</p>

                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <HiOutlineCalendarDays className="w-4 h-4 text-[#46c2de]" />
                  {a.date}

                  <HiOutlineClock className="w-4 h-4 ml-3 text-[#46c2de]" />
                  {a.time}
                </div>

                {a.mode && (
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    {a.mode.toLowerCase().includes("audio") ? (
                      <HiOutlinePhone className="w-4 h-4 text-[#46c2de]" />
                    ) :
                      a.mode.toLowerCase().includes("video") ? (
                        <HiOutlineVideoCamera className="w-4 h-4 text-[#46c2de]" />
                      ) : (
                        <HiOutlineBuildingOffice2 className="w-4 h-4 text-[#46c2de]" />
                      )}
                    {a.mode}
                  </div>
                )}

                {a.problem && (
                  <div className="text-sm text-gray-500 italic">
                    “{a.problem}”
                  </div>
                )}
              </div>
              <span className={`mt-2 w-fit text-xs px-2 py-1 rounded-full font-medium
                ${computedStatus === "upcoming"
                  ? "bg-blue-100 text-blue-700"
                  : computedStatus === "missed"
                    ? "bg-yellow-100 text-yellow-700"
                    : computedStatus === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                }
              `}>
                {computedStatus?.toUpperCase()}
              </span>
              {/* <button
              onClick={() => cancelAppointment(index)}
              className="text-sm text-red-600 border border-red-400 rounded-lg px-4 py-2 hover:bg-red-50 transition"
            >
              Cancel
            </button> */}

              <div className="absolute top-3 right-3" ref={menuRef} data-menu>
                <button
                  onClick={() => setOpenMenu(openMenu === a.id ? null : a.id)}
                  className="p-2 rounded-full hover:bg-gray-100"
                  data-menu
                >
                  <HiEllipsisVertical className="w-5 h-5 text-gray-600" />
                </button>

                {openMenu === a.id && (
                  <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-md w-44 z-50" data-menu>
                    <Link
                      href={`/dashboard/appointments/${a.id}`}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm text-gray-700"
                    >
                      <HiOutlineEye className="w-4 h-4" />
                      View Details
                    </Link>

                    {/* Reschedule (upcoming + missed only) */}
                    {(computedStatus === "upcoming" || computedStatus === "missed") && (
                      <button
                        onClick={() => {
                          setOpenMenu(null);
                          router.push(`/dashboard/reschedule/${a.id}`);
                        }}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm text-gray-700"
                      >
                        <HiOutlinePencilSquare className="w-4 h-4" />
                        Reschedule
                      </button>
                    )}

                    {/* Cancel (only upcoming) */}
                    {computedStatus === "upcoming" && (
                      <button
                        onClick={() => {
                          cancelAppointment(a.id);
                          setOpenMenu(null);
                        }}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-sm text-red-600"
                      >
                        <HiOutlineXMark className="w-4 h-4" />
                        Cancel
                      </button>
                    )}

                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}