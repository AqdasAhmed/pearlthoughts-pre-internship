"use client";

import doctors from "@/data/doctors.json";
import Link from "next/link";
import { useState, useMemo } from "react";

export default function Doctors() {

  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("All");
  const [availableOnly, setAvailableOnly] = useState(false);

  const statusStyles = {
    green: "text-green-600 bg-green-100",
    red: "text-red-600 bg-red-100",
    yellow: "text-yellow-600 bg-yellow-100",
  };

  const specializations = [
    "All",
    ...Array.from(new Set(doctors.map((d) => d.specialization))),
  ];

  const filteredDoctors = useMemo(() => {
    return doctors.filter((d) => {
      const matchesSearch = d.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesSpecialization =
        specialization === "All" || d.specialization === specialization;

      const matchesAvailability =
        !availableOnly || d.status.includes("Available");

      return matchesSearch && matchesSpecialization && matchesAvailability;
    });
  }, [search, specialization, availableOnly]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        Doctors
      </h1>
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">

        {/* Search */}
        <div className="relative w-full md:w-72">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search doctors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-gray-700 bg-gray-50 focus:bg-white focus:border-[#46c2de] focus:ring-2 focus:ring-[#46c2de]/20 outline-none transition"
          />
        </div>

        <div className="flex gap-3 items-center">

          {/* Specialization */}
          <div className="relative">
            <select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="appearance-none px-3 py-2 pr-8 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 focus:bg-white focus:border-[#46c2de] focus:ring-2 focus:ring-[#46c2de]/20 outline-none transition"
            >
              {specializations.map((sp) => (
                <option key={sp}>{sp}</option>
              ))}
            </select>

            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
              ▼
            </span>
          </div>

          {/* Available toggle switch */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div className="relative">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-[#46c2de] transition"></div>
              <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition"></div>
            </div>
            <span className="text-sm text-gray-700">Available Today</span>
          </label>

        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredDoctors.map((d) => (
          <div key={d.id} className="min-w-[260px] flex-shrink-0 bg-white border border-[#46c2de] rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between snap-start">     <div className="flex flex-col items-center">
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
        ))}
      </div>
      {filteredDoctors.length === 0 && (
        <p className="text-gray-400">No doctors found.</p>
      )}
    </div>
  );
}