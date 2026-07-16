import { Home, Plus } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white h-screen p-6">
      <h1 className="text-2xl font-bold">
        CollabSpace
      </h1>

      <nav className="mt-10 space-y-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100">
          <Home size={20} />
          Dashboard
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100">
          <Plus size={20} />
          New Workspace
        </button>
      </nav>
    </aside>
  );
}