"use client";

import { useEffect, useState } from "react";
import { HiOutlineCalendarDays, HiOutlineClock, HiOutlineVideoCamera, HiOutlineBuildingOffice2 } from "react-icons/hi2";

type Appointment = {
  doctor: string;
  specialization: string;
  date: string;
  time: string;
  mode?: string;
  problem?: string;
};

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments") || "[]");
    setAppointments(stored);
  }, []);

  // Cancel appointment
  const cancelAppointment = (index: number) => {
    const updated = appointments.filter((_, i) => i !== index);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  appointments.sort((a, b) =>
    new Date(a.date + " " + a.time).getTime() -
    new Date(b.date + " " + b.time).getTime()
  );

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

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {appointments.map((a, index) => (
          <div
            key={index}
            className="bg-white border border-[#46c2de] rounded-xl p-5 shadow-sm flex flex-col justify-between"
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
                  {a.mode.toLowerCase().includes("online") ||
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

            <button
              onClick={() => cancelAppointment(index)}
              className="mt-4 text-sm text-red-600 border border-red-400 rounded-lg px-4 py-2 hover:bg-red-50 transition"
            >
              Cancel Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}