import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createChannel } from "../../api/channel.api";
import { useAuthStore } from "../../store/auth.store";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateChannelModal({
  open,
  onClose,
}: Props) {
  const workspaceId = useAuthStore(
    (state) => state.selectedWorkspaceId
  );

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      createChannel(
        workspaceId!,
        name,
        description
      ),

    onSuccess: () => {
      toast.success("Channel created");

      queryClient.invalidateQueries({
        queryKey: [
          "channels",
          workspaceId,
        ],
      });

      setName("");
      setDescription("");

      onClose();
    },

    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ??
          "Failed to create channel"
      );
    },
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <h2 className="text-2xl font-semibold">
          Create Channel
        </h2>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Channel name"
          className="mt-5 w-full rounded-lg border p-3"
        />

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          placeholder="Description"
          className="mt-4 w-full rounded-lg border p-3"
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={() => mutation.mutate()}
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            {mutation.isPending
              ? "Creating..."
              : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}