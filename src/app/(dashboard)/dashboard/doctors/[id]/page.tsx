"use client";

import { useParams } from "next/navigation";
import doctors from "@/data/doctors.json";
import Link from "next/link";
import {HiStar} from "react-icons/hi2";

export default function DoctorProfile() {
  const { id } = useParams();
  const doctor = doctors.find(d => d.id === Number(id));

  if (!doctor) return <p className="p-6">Doctor not found</p>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Header */}
      <div className="bg-white border border-[#46c2de] rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-32 h-32 rounded-full object-cover border border-[#46c2de]"
        />

        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-2xl font-bold text-gray-800">{doctor.name}</h1>
          <p className="text-gray-500">{doctor.specialization}</p>

          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            doctor.color === "green"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}>
            {doctor.status}
          </span>

          <div className="text-sm text-gray-500">
            {doctor.university}
          </div>

          <div className="text-sm text-gray-500">
            {doctor.experience} years experience
          </div>

          <div className="text-sm text-gray-400">
            <HiStar className="w-4 h-4 inline mr-1 mb-1 text-[#46c2de]/50" />
            <span className="font-semibold">{doctor.rating}</span> ({doctor.reviews} reviews)
          </div>

          <Link
            href={`/dashboard/book/${doctor.id}`}
            className="inline-block mt-3 bg-[#46c2de] text-white px-5 py-2 rounded-lg hover:bg-[#46c2de]/90 transition"
          >
            Book Appointment
          </Link>
        </div>
      </div>

      {/* About */}
      <div className="bg-white border border-[#46c2de] rounded-xl p-6 space-y-3">
        <h2 className="font-semibold text-lg text-gray-800">About Doctor</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Dr. {doctor.name.split(" ")[1]} is a highly experienced {doctor.specialization.toLowerCase()}
          with over {doctor.experience} years of clinical experience. Graduated from {doctor.university}.
          Known for patient-friendly consultation and accurate diagnosis.
        </p>
      </div>

      {/* Availability */}
      <div className="bg-white border border-[#46c2de] rounded-xl p-6">
        <h2 className="font-semibold text-lg text-gray-800 mb-3">Consultation Info</h2>

        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Average consultation: 20–30 minutes</li>
          <li>• Supports online & in-person visit</li>
          <li>• Instant booking confirmation</li>
        </ul>
      </div>

    </div>
  );
}