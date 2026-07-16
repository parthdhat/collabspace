import { useAuthStore } from "../../store/auth.store";

export default function Navbar() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8">
      <h2 className="text-xl font-semibold">
        Dashboard
      </h2>

      <button
        onClick={logout}
        className="rounded-lg bg-red-500 px-4 py-2 text-white"
      >
        Logout
      </button>
    </header>
  );
}