import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import MessageInput from "./MessageInput";

export default function ChatLayout() {
  return (
    <div className="flex h-full flex-col rounded-xl bg-white shadow">
      <ChatHeader />
      <ChatBody />
      <MessageInput />
    </div>
  );
}