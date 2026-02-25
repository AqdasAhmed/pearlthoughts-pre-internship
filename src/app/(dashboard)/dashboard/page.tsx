"use client";

import doctors from "@/data/doctors.json";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardHome() {
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments") || "[]");
    setAppointments(stored);
  }, []);

  const upcomingAppointments = appointments.filter(a => {
    const dateTime = new Date(`${a.date} ${a.time}`);
    return dateTime >= new Date();
  }).length;

  const availableDoctors = doctors.filter(d =>
    d.status.includes("Available")
  ).length;

  const statusStyles = {
    green: "text-green-600 bg-green-100",
    red: "text-red-600 bg-red-100",
    yellow: "text-yellow-600 bg-yellow-100",
  };
  const sortedDoctors = [...doctors].sort((a, b) => {
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }

    return b.reviews - a.reviews;
  });
  const experiencedDoctors = [...doctors]
    .sort((a, b) => b.experience - a.experience)
    .slice(0, 10);

  const DoctorCard = ({ d }: any) => (
    <div className="w-[260px] flex-shrink-0 bg-white border border-[#46c2de] rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between snap-start">     <div className="flex flex-col items-center">
      <img src={d.image} alt={d.name} className="w-16 h-16 rounded-full object-cover mb-2" />
      <p className="text-gray-700 font-medium">{d.name}</p>
      <p className="text-gray-400 text-sm">{d.specialization}</p>

      <span className={`px-2 py-1 rounded-full text-xs font-medium ${d.status === "Available Today"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
        }`}>
        {d.status}
      </span>
      
      <p className="text-xs text-gray-500">{d.university}</p>
      <p className="text-xs text-gray-400">{d.experience} years experience</p>

      <div className="flex items-center mt-1">
        <span className="text-xs font-semibold text-gray-700">{d.rating}</span>
        <span className="text-xs text-gray-400 ml-1">({d.reviews})</span>
      </div>
    </div>

      <div className="flex gap-2">
        <Link
          href={`/dashboard/doctors/${d.id}`}
          className="mt-4 w-1/2 text-sm text-[#46c2de] font-medium border border-[#46c2de] rounded-lg px-4 py-2 hover:bg-[#46c2de]/10 transition text-center"
        >
          Profile
        </Link>

        <Link
          href={`/dashboard/book/${d.id}`}
          className="mt-4 w-1/2 text-sm text-white font-medium bg-[#46c2de] rounded-lg px-4 py-2 hover:bg-[#46c2de]/85 transition text-center"
        >
          Book
        </Link>
      </div>
    </div>
  );

  return (

    <div className="flex flex-col gap-4 max-w-7xl snap-x snap-mandatory pb-2 scrollbar-hide">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        Welcome to Schedula
      </h1>
      <div className="bg-white border border-[#46c2de] rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Good to see you 👋
          </h2>
          <p className="text-sm text-gray-500">
            Manage your appointments and find the right doctor quickly
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/dashboard/doctors"
            className="px-4 py-2 rounded-lg border border-[#46c2de] text-[#46c2de] hover:bg-[#46c2de]/10 transition text-sm"
          >
            Browse Doctors
          </Link>

          <Link
            href="/dashboard/appointments"
            className="px-4 py-2 rounded-lg bg-[#46c2de] text-white hover:bg-[#46c2de]/90 transition text-sm"
          >
            My Appointments
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        <Link
          href="/dashboard/appointments"
          className="bg-white border border-[#46c2de] rounded-xl p-5 shadow-sm hover:shadow-md transition"
        >
          <p className="text-gray-500 text-sm">Upcoming Appointments</p>
          <p className="text-gray-800 text-2xl font-semibold">
            {upcomingAppointments}
          </p>
        </Link>

        <Link
          href="/dashboard/doctors"
          className="bg-white border border-[#46c2de] rounded-xl p-5 shadow-sm hover:shadow-md transition"
        >
          <p className="text-gray-500 text-sm">Doctors Available</p>
          <p className="text-gray-800 text-2xl font-semibold">
            {availableDoctors}
          </p>
        </Link>

      </div>

      <h1 className="text-xl font-semibold text-gray-700">Top Rated Doctors</h1>

      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden">
        {sortedDoctors.map((d) => (
          <DoctorCard key={d.id} d={d} />
        ))}
      </div>
      <h1 className="text-xl font-semibold text-gray-700 mt-4">
        Most Experienced Doctors
      </h1>

      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden">
        {experiencedDoctors.map((d) => (
          <DoctorCard key={d.id} d={d} />
        ))}
      </div>
    </div>
  );
}