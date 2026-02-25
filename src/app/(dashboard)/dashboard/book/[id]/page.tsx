"use client";

import { useParams, useRouter } from "next/navigation";
import doctors from "@/data/doctors.json";
import { useState } from "react";

export default function BookAppointment() {
    const { id } = useParams();
    const router = useRouter();

    const doctor = doctors.find((d) => d.id === Number(id));
    if (!doctor) return <p className="p-6">Doctor not found</p>;

    // date range (next 7 days)
    const today = new Date();
    const days = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date();
        d.setDate(today.getDate() + i);

        return {
            label:
                i === 0
                    ? "Today"
                    : d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric" }),
            value: d.toISOString().split("T")[0],
        };
    });
    const timeSlots = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
        "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
        "20:00", "20:30", "21:00", "21:30", "22:00"
    ];

    const unavailableSlots: Record<number, { date: string; time: string }[]> = {
        1: [{ date: days[0].value, time: "10:00" }],
    };

    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [mode, setMode] = useState("In-Person");
    const [problem, setProblem] = useState("");
    const [patientName, setPatientName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("Male");
    const [phone, setPhone] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [conditions, setConditions] = useState("");
    const [forSomeoneElse, setForSomeoneElse] = useState(false);
    // get existing bookings from storage
    const getBookedSlots = (doctorName: string, date: string) => {
        const existing = JSON.parse(localStorage.getItem("appointments") || "[]");
        return existing
            .filter((a: any) => a.doctor === doctorName && a.date === date)
            .map((a: any) => a.time);
    };

    const isSlotUnavailable = (date: string, time: string) => {
        // doctor unavailable today
        const isToday =
            date === new Date().toISOString().split("T")[0] &&
            doctor.status === "Unavailable Today";

        if (isToday) return true;

        // manually blocked slots
        const manualBlocked =
            unavailableSlots[doctor.id]?.some(s => s.date === date && s.time === time) ?? false;

        // already booked slots
        const bookedSlots = getBookedSlots(doctor.name, date);
        const alreadyBooked = bookedSlots.includes(time);

        return manualBlocked || alreadyBooked;
    };

    const handleBooking = () => {
        if (!selectedDate || !selectedTime) {
            alert("Please select date and time slot");
            return;
        }

        if (!patientName.trim()) {
            alert("Patient name is required");
            return;
        }

        if (!age || Number(age) <= 0) {
            alert("Valid age is required");
            return;
        }

        if (!phone || phone.length < 10) {
            alert("Valid phone number is required");
            return;
        }

        // if (!bloodGroup) {
        //     alert("Please select blood group");
        //     return;
        // }

        if (!mode) {
            alert("Please select consultation mode");
            return;
        }

        if (isSlotUnavailable(selectedDate, selectedTime)) {
            alert("This slot is no longer available");
            return;
        }

        if (isPastSlot(selectedDate, selectedTime)) {
            alert("This time slot has already passed");
            return;
        }
        
        const booking = {
            id: crypto.randomUUID(),
            doctor: doctor.name,
            specialization: doctor.specialization,
            date: selectedDate,
            time: selectedTime,
            mode,
            problem,
            patientName,
            age,
            gender,
            phone,
            bloodGroup,
            conditions,
            status: "upcoming"
        };

        const existing = JSON.parse(localStorage.getItem("appointments") || "[]");
        localStorage.setItem("appointments", JSON.stringify([...existing, booking]));

        alert("Appointment booked!");
        router.push("/dashboard/appointments");
    };

    const isDoctorUnavailable =
        doctor.status === "Unavailable Today";

    const isSelectedSlotUnavailable =
        selectedDate && selectedTime &&
        isSlotUnavailable(selectedDate, selectedTime);

    const isPastSlot = (date: string, time: string) => {
        const now = new Date();

        const selected = new Date(date + "T" + time);

        return selected.getTime() <= now.getTime();
    };

    const visibleSlots = selectedDate
        ? timeSlots.filter((slot) => !isPastSlot(selectedDate, slot))
        : [];

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Book Appointment</h1>

            <div className="bg-white border border-[#46c2de] rounded-xl p-6 space-y-5">

                {/* Doctor info */}
                <div>
                    <p className="font-semibold text-gray-800">{doctor.name}</p>
                    <p className="text-sm text-gray-400">{doctor.specialization}</p>
                </div>

                {/* Date selector */}
                <div>
                    <p className="text-sm text-gray-600 mb-2">Select Date</p>
                    <div className="flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
                        {days.map(d => {
                            const isToday = d.label === "Today";
                            const disabledToday = isToday && doctor.status === "Unavailable Today";

                            return (
                                <button
                                    key={d.value}
                                    disabled={disabledToday}
                                    onClick={() => { setSelectedDate(d.value); setSelectedTime(""); }}
                                    className={`px-4 py-2 rounded-lg border text-sm whitespace-nowrap
                                            ${disabledToday
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : selectedDate === d.value
                                                ? "bg-[#46c2de] text-white border-[#46c2de]"
                                                : "border-gray-300 text-gray-700"
                                        }`}
                                >
                                    {d.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Time slots */}
                <div className="space-y-4">
                    <p className="text-sm text-gray-600 mb-2">Select Time</p>

                    {!selectedDate ? (
                        <p className="text-gray-400 text-sm">Please select a date first</p>
                    ) : (
                        <>
                            <div className="flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
                                {visibleSlots.map(slot => {
                                    const disabled = isSlotUnavailable(selectedDate, slot);

                                    return (
                                        <button
                                            key={slot}
                                            disabled={disabled}
                                            onClick={() => setSelectedTime(slot)}
                                            className={`text-gray-700 h-10 w-24 p-2 rounded-lg text-md border transition ${disabled
                                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                : selectedTime === slot
                                                    ? "bg-[#46c2de] text-white border-[#46c2de]"
                                                    : "border-gray-300 hover:border-[#46c2de]"
                                                }`}
                                        >
                                            {slot}
                                        </button>
                                    );
                                })}
                                {visibleSlots.length === 0 && (
                                    <p className="text-red-500 text-sm">
                                        No available time slots remaining for this day
                                    </p>
                                )}
                            </div>
                            {!selectedTime ? (
                                <p className="text-gray-400 text-sm">Please select a time slot</p>
                            ) : (
                                <>
                                    {/* Patient Details */}
                                    < div className="space-y-4 border rounded-xl p-4">
                                        <h2 className="font-semibold text-gray-800">Patient Information</h2>

                                        <div>
                                            <label className="text-sm text-gray-600">Patient Name</label>
                                            <input
                                                value={patientName}
                                                onChange={(e) => setPatientName(e.target.value)}
                                                className="w-full border rounded-lg px-3 py-2 mt-1 text-gray-700"
                                                placeholder="Enter full name"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-sm text-gray-600">Age</label>
                                                <input
                                                    type="number"
                                                    value={age}
                                                    onChange={(e) => setAge(e.target.value)}
                                                    className="w-full border rounded-lg px-3 py-2 mt-1 text-gray-700"
                                                    placeholder="Age"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="text-sm text-gray-600">Gender</label>
                                                <select
                                                    value={gender}
                                                    onChange={(e) => setGender(e.target.value)}
                                                    className="w-full border rounded-lg px-3 py-2 mt-1 text-gray-700"
                                                    required
                                                >
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-sm text-gray-600">Phone Number</label>
                                            <input
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="w-full border rounded-lg px-3 py-2 mt-1 text-gray-700"
                                                placeholder="10 digit mobile number"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-sm text-gray-600">Blood Group</label>
                                                <select
                                                    value={bloodGroup}
                                                    onChange={(e) => setBloodGroup(e.target.value)}
                                                    className="w-full border rounded-lg px-3 py-2 mt-1 text-gray-700"
                                                    required
                                                >
                                                    <option value="">Select</option>
                                                    <option>A+</option><option>A-</option>
                                                    <option>B+</option><option>B-</option>
                                                    <option>O+</option><option>O-</option>
                                                    <option>AB+</option><option>AB-</option>
                                                </select>
                                            </div>

                                            <label className="text-gray-600 flex items-center gap-2 text-sm mt-6">
                                                <input
                                                    type="checkbox"
                                                    checked={forSomeoneElse}
                                                    onChange={(e) => setForSomeoneElse(e.target.checked)}
                                                />
                                                Booking for someone else
                                            </label>
                                        </div>

                                        <div>
                                            <label className="text-sm text-gray-600">Existing Conditions (Optional)</label>
                                            <textarea
                                                value={conditions}
                                                onChange={(e) => setConditions(e.target.value)}
                                                className="w-full border rounded-lg px-3 py-2 mt-1 text-gray-700"
                                                rows={2}
                                                placeholder="Diabetes, BP, Asthma..."
                                            />
                                        </div>
                                    </div>
                                    {/* Select Mode */}
                                    <div>
                                        <label className="text-sm text-gray-600 mb-1 block">
                                            Select Mode
                                        </label>
                                        <select
                                            value={mode}
                                            onChange={(e) => setMode(e.target.value)}
                                            className="w-full border rounded-lg px-3 py-2 text-gray-700"
                                            required
                                        >
                                            <option>In-Person</option>
                                            <option>Audio Call</option>
                                            <option>Video Call</option>
                                            <option>Home Visit</option>
                                        </select>
                                    </div>

                                    {/* Your Problem */}
                                    <div>
                                        <label className="text-sm text-gray-600 mb-1 block">
                                            Your Problem
                                        </label>
                                        <textarea
                                            value={problem}
                                            onChange={(e) => setProblem(e.target.value)}
                                            placeholder="Briefly describe your issue..."
                                            className="w-full border rounded-lg px-3 py-2 text-gray-700"
                                            rows={3}
                                        />
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>

                {/* Confirm */}
                <button
                    onClick={handleBooking}
                    className={`w-full py-2 rounded-lg ${selectedDate &&
                        selectedTime &&
                        patientName &&
                        age &&
                        phone &&
                        phone.length >= 10 &&
                        mode
                        ? "bg-[#46c2de] text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`} disabled={
                            !selectedDate ||
                            !selectedTime ||
                            !patientName ||
                            !age ||
                            !phone ||
                            phone.length < 10 ||
                            !mode
                        }
                >
                    Confirm Booking
                </button>

            </div>
        </div >
    );
}