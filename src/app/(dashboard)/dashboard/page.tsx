export default function DashboardHome() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome to Schedula Dashboard
      </h1>

      <div className="border border-[#46c2de] bg-white rounded-xl p-6 shadow-sm">
        <p className="text-gray-600">
          Manage appointments and browse doctors from the sidebar.
        </p>
      </div>
    </div>
  );
}