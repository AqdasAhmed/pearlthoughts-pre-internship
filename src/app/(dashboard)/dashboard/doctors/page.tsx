// src/app/(dashbaord)/doctors/page.tsx
import doctors from "@/data/doctors.json";

export default function Doctors() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Doctors</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {doctors.map((d) => (
          <div
            key={d.id}
            className="bg-white border border-[#46c2de] rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <p className="text-lg font-semibold text-gray-800">{d.name}</p>
            <p className="text-gray-500">{d.specialization}</p>

            <button className="mt-3 text-sm text-[#46c2de] font-medium hover:underline">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}