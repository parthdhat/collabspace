import type { Workspace } from "../../types/workspace";

interface Props {
  workspace: Workspace;
}

export default function WorkspaceCard({
  workspace,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
      <h2 className="text-xl font-semibold">
        {workspace.name}
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        {workspace.slug}
      </p>
    </div>
  );
}