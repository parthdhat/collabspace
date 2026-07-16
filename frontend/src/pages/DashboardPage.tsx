import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import DashboardLayout from "../components/layout/DashboardLayout";
import WorkspaceCard from "../components/common/WorkspaceCard";
import CreateWorkspaceModal from "../components/common/CreateWorkspaceModal";
import ChatLayout from "../components/chat/ChatLayout";
import { getWorkspaces } from "../api/workspace.api";
import { useAuthStore } from "../store/auth.store";

export default function DashboardPage() {
  const [open, setOpen] = useState(false);

  const selectedWorkspaceId = useAuthStore(
    (state) => state.selectedWorkspaceId
  );

  const setSelectedWorkspace = useAuthStore(
    (state) => state.setSelectedWorkspace
  );

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["workspaces"],
    queryFn: getWorkspaces,
  });

  useEffect(() => {
    if (
      data?.data?.length &&
      !selectedWorkspaceId
    ) {
      setSelectedWorkspace(data.data[0].id);
    }
  }, [
    data,
    selectedWorkspaceId,
    setSelectedWorkspace,
  ]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <p>Loading workspaces...</p>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <p>Something went wrong.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ChatLayout />

      <CreateWorkspaceModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </DashboardLayout>
  );
}