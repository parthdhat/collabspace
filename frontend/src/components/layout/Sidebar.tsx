import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Hash, Pencil, Plus, Trash2 } from "lucide-react";

import { getChannels } from "../../api/channel.api";
import { useAuthStore } from "../../store/auth.store";

import CreateChannelModal from "../common/CreateChannelModal";
import WorkspaceList from "./WorkspaceList";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const workspaceId = useAuthStore(
    (state) => state.selectedWorkspaceId
  );

  const selectedChannelId = useAuthStore(
    (state) => state.selectedChannelId
  );

  const setSelectedChannel = useAuthStore(
    (state) => state.setSelectedChannel
  );

  const { data } = useQuery({
    queryKey: ["channels", workspaceId],
    queryFn: () => getChannels(workspaceId!),
    enabled: !!workspaceId,
  });

  useEffect(() => {
    if (
      data?.data?.length &&
      !selectedChannelId
    ) {
      setSelectedChannel(data.data[0].id);
    }
  }, [
    data,
    selectedChannelId,
    setSelectedChannel,
  ]);

  return (
    <>
      <aside className="w-64 border-r bg-white p-6">
        <h1 className="mb-8 text-2xl font-bold">
          CollabSpace
        </h1>

        <WorkspaceList />

        <hr className="my-8" />

        <div>
          <h2 className="mb-3 text-sm font-semibold text-gray-500">
            CHANNELS
          </h2>

          <div className="space-y-2">
            {data?.data?.map((channel: any) => (
              <div
                key={channel.id}
                className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-100"
              >
                <button
                  onClick={() =>
                    setSelectedChannel(channel.id)
                  }
                  className={`flex flex-1 items-center gap-2 rounded-lg px-2 py-1 text-left transition ${
                    selectedChannelId === channel.id
                      ? "bg-gray-200 font-medium"
                      : ""
                  }`}
                >
                  <Hash size={18} />
                  {channel.name}
                </button>

                <div className="ml-2 flex gap-2">
                  <button className="text-gray-500 hover:text-black">
                    <Pencil size={16} />
                  </button>

                  <button className="text-gray-500 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setOpen(true)}
            className="mt-4 flex items-center gap-2 text-sm text-gray-600 hover:text-black"
          >
            <Plus size={16} />
            Create Channel
          </button>
        </div>
      </aside>

      <CreateChannelModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}