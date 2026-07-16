import { useAuthStore } from "../../store/auth.store";

export default function ChatHeader() {
  const selectedChannelId = useAuthStore(
    (state) => state.selectedChannelId
  );

  return (
    <div className="border-b bg-white px-6 py-4">
      <h2 className="text-2xl font-semibold">
        {selectedChannelId
          ? `# ${selectedChannelId}`
          : "Select a Channel"}
      </h2>
    </div>
  );
}