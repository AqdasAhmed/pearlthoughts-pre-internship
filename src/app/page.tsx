import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#e8f9fc]">

      {/* Navbar */}
      <header className="flex items-center justify-between px-6 md:px-12 py-5">
        <h1 className="text-2xl font-bold text-[#46c2de]">Schedula</h1>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="text-gray-700 px-4 py-2 font-medium hover:text-[#46c2de]"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="bg-[#46c2de] text-white px-4 py-2 rounded-lg hover:bg-[#3bb3cd] transition"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 mt-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 max-w-3xl">
          Book Doctor Appointments
          <span className="text-[#46c2de]"> Instantly</span>
        </h2>

        <p className="mt-4 text-gray-600 max-w-xl">
          Find the right doctor, choose a convenient time slot,
          and manage your healthcare appointments — all in one place.
        </p>

        <div className="flex gap-4 mt-8">
          <Link
            href="/signup"
            className="bg-[#46c2de] text-white px-6 py-3 rounded-xl text-lg hover:bg-[#3bb3cd] transition"
          >
            Book Appointment
          </Link>

          <Link
            href="/login"
            className="border border-[#46c2de] text-[#46c2de] px-6 py-3 rounded-xl text-lg hover:bg-[#46c2de]/10 transition"
          >
            I already have an account
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 px-6 md:px-20 mt-24">
        {[
          {
            title: "Smart Scheduling",
            desc: "Predefined time slots with real-time availability checking.",
          },
          {
            title: "Doctor Profiles",
            desc: "Ratings, reviews, experience and specialization info.",
          },
          {
            title: "Easy Management",
            desc: "View and cancel appointments anytime.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="bg-white p-6 rounded-xl shadow-sm border border-[#46c2de]/30 text-center"
          >
            <h3 className="font-semibold text-lg text-gray-800">{f.title}</h3>
            <p className="text-gray-600 mt-2">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-24 text-center text-sm text-gray-500 pb-6">
        © {new Date().getFullYear()} Schedula — Healthcare simplified
      </footer>
    </div>
  );
}