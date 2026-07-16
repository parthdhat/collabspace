import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createWorkspace } from "../../api/workspace.api";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateWorkspaceModal({
  open,
  onClose,
}: Props) {
  const [name, setName] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => createWorkspace(name),

    onSuccess: () => {
      toast.success("Workspace created");

      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });

      setName("");

      onClose();
    },

    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ??
          "Failed to create workspace"
      );
    },
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <h2 className="text-2xl font-semibold">
          Create Workspace
        </h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Workspace name"
          className="mt-6 w-full rounded-lg border p-3"
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
            {mutation.isPending ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}