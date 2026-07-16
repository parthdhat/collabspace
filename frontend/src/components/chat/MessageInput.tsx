export default function MessageInput() {
  return (
    <div className="border-t bg-white p-4">
      <div className="flex gap-3">
        <input
          className="flex-1 rounded-lg border px-4 py-3"
          placeholder="Type a message..."
        />

        <button
          className="rounded-lg bg-black px-5 py-3 text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}