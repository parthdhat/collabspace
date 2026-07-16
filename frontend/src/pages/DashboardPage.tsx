import DashboardLayout from "../components/layout/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">
        Welcome to CollabSpace 🚀
      </h1>

      <p className="mt-4 text-gray-600">
        Your workspaces will appear here.
      </p>
    </DashboardLayout>
  );
}