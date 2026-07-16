import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";

import { getWorkspaces } from "../../api/workspace.api";
import { useAuthStore } from "../../store/auth.store";

export default function WorkspaceList() {
  const selectedWorkspaceId = useAuthStore(
    (state) => state.selectedWorkspaceId
  );

  const setSelectedWorkspace = useAuthStore(
    (state) => state.setSelectedWorkspace
  );

  const { data } = useQuery({
    queryKey: ["workspaces"],
    queryFn: getWorkspaces,
  });

  return (
    <div>
      <h2 className="mb-3 text-sm font-semibold text-gray-500">
        WORKSPACES
      </h2>

      <div className="space-y-2">
        {data?.data.map((workspace: any) => (
          <button
            key={workspace.id}
            onClick={() =>
              setSelectedWorkspace(workspace.id)
            }
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 transition ${
              selectedWorkspaceId === workspace.id
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <span>{workspace.name}</span>

            {selectedWorkspaceId === workspace.id && (
              <Check size={16} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}