import MembersSection from "../../components/MembersSection";
import { authService, workspaceService } from "@/lib/server/services/appwrite";

export default async function MembersPage() {
  const user = await authService.getCurrentUser();
  const workspaces = await workspaceService.getUserWorkspaces();
  const workspaceId = workspaces?.teams?.[0].$id;
  if (!workspaceId || !user) return null;

  const memberships = await workspaceService.getWorkspaceMembers(workspaceId);
  if (!memberships) return null;

  return (
    <MembersSection
      members={memberships.memberships}
      workspaceId={workspaceId}
      currentUserId={user.$id}
    />
  );
}
