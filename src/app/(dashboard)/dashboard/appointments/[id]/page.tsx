"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineCalendarDays, HiOutlineClock, HiOutlinePhone, HiOutlineUser } from "react-icons/hi2";

export default function AppointmentDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [appointment, setAppointment] = useState<any>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments") || "[]");
    const found = stored.find((a: any) => a.id === id);
    setAppointment(found ? { ...found, computedStatus: getComputedStatus(found) } : null);
  }, [id]);

  if (!appointment)
    return <div className="p-6 text-gray-500">Appointment not found</div>;

  const cancelAppointment = () => {
    const stored = JSON.parse(localStorage.getItem("appointments") || "[]");
    const updated = stored.map((a: any) =>
      a.id === id ? { ...a, status: "cancelled" } : a
    );

    localStorage.setItem("appointments", JSON.stringify(updated));
    router.push("/dashboard/appointments");
  };

  function getComputedStatus(a: any) {
    if (a.status === "cancelled") return "cancelled";
    if (a.status === "completed") return "completed";

    const appointmentTime = new Date(`${a.date} ${a.time}`).getTime();
    const now = Date.now();

    if (appointmentTime < now) return "missed";
    return "upcoming";
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Appointment Details</h1>

      <div className="bg-white border border-[#46c2de] rounded-xl p-6 space-y-5">

        {/* Doctor */}
        <div>
          <p className="text-xl font-semibold text-gray-800">{appointment.doctor}</p>
          <p className="text-gray-500">{appointment.specialization}</p>
        </div>

        {/* Status */}
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium
          ${appointment.computedStatus === "cancelled"
            ? "bg-red-100 text-red-700"
            : appointment.computedStatus === "missed"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-blue-100 text-blue-700"}
        `}>
          {appointment.computedStatus?.toUpperCase()}
        </span>

        {/* Date & Time */}
        <div className="space-y-2 text-gray-700">
          <div className="flex items-center gap-2">
            <HiOutlineCalendarDays className="text-[#46c2de]" />
            {appointment.date}
          </div>

          <div className="flex items-center gap-2">
            <HiOutlineClock className="text-[#46c2de]" />
            {appointment.time}
          </div>
        </div>

        {/* Patient */}
        <div className="border-t pt-4 space-y-2">
          <p className="font-semibold text-gray-800">Patient Information</p>

          <div className="flex items-center gap-2">
            <HiOutlineUser className="text-[#46c2de]" />
            <p className="text-gray-400">{appointment.patientName} ({appointment.gender}, {appointment.age})</p>
          </div>

          {appointment.phone && (
            <div className="flex items-center gap-2">
              <HiOutlinePhone className="text-[#46c2de]" />
              <p className="text-gray-400">{appointment.phone}</p>
            </div>
          )}

          {appointment.bloodGroup && (
            <p className="text-sm text-gray-600">Blood Group: {appointment.bloodGroup}</p>
          )}
        </div>

        {/* conditions */}
        {appointment.conditions && (
          <div className="border-t pt-4">
            <p className="font-semibold text-gray-800">Conditions</p>
            <p className="text-gray-600">{appointment.conditions}</p>
          </div>
        )}

        {appointment.mode && (
          <div className="border-t pt-4">
            <p className="font-semibold text-gray-800">Mode</p>
            <p className="text-gray-600">{appointment.mode}</p>
          </div>
        )}

        {/* Problem */}
        {appointment.problem && (
          <div className="border-t pt-4">
            <p className="font-semibold text-gray-800">Problem</p>
            <p className="text-gray-600">{appointment.problem}</p>
          </div>
        )}

        {/* Actions */}
        {appointment.computedStatus !== "cancelled" && (
          <>
            <div className="border-t pt-4 flex items-center gap-4">
              <button
                onClick={() => router.push(`/dashboard/appointments/${id}/reschedule`)}
                className="w-full mt-4 bg-[#46c2de] text-white py-2 rounded-lg hover:bg-[#3ba8c4]"
              >
                Reschedule Appointment
              </button>
              <button
                onClick={cancelAppointment}
                className="w-full mt-4 border border-red-400 text-red-600 py-2 rounded-lg hover:bg-red-50"
              >
                Cancel Appointment
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}