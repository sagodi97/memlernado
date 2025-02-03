import GeneralSection from "./components/GeneralSection";
import MembersSection from "./components/MembersSection";
import { TabsContent } from "@/components/ui/tabs";
import { authService, workspaceService } from "@/lib/server/services/appwrite";

export default async function TeamSettingsPage() {
  const user = await authService.getCurrentUser();
  const workspaces = await workspaceService.getUserWorkspaces();
  const workspaceId = workspaces?.teams?.[0].$id;
  if (!workspaceId || !user) return null;
  const memberships = await workspaceService.getWorkspaceMembers(workspaceId);
  if (!memberships) return null;

  return (
    <div>
      <TabsContent value="general">
        <GeneralSection team={workspaces.teams[0]} />
      </TabsContent>
      <TabsContent value="members">
        <MembersSection
          members={memberships.memberships}
          workspaceId={workspaces.teams[0].$id}
          currentUserId={user.$id}
        />
      </TabsContent>
    </div>
  );
}
