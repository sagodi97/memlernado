import { MobileSideBar, Sidebar } from "@/components/sidebar";
import { UserMenuButton } from "@/components/user-menu-button";
import {
  authService,
  workspaceService,
  squadService,
  squadMembershipService,
} from "@/lib/server/services/appwrite";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await authService.getCurrentUser();
  if (!user) redirect("/landing");

  const workspaces = await workspaceService.getUserWorkspaces();
  if (!workspaces?.total) redirect("/onboarding");

  const roles = await workspaceService.getCurrentUserRoles(
    workspaces.teams[0].$id
  );
  const squads = await squadService.getSquads(workspaces.teams[0].$id);
  const memberships = await squadMembershipService.getUserMemberships(
    user.$id,
    workspaces.teams[0].$id
  );

  return (
    <div className="flex gap-3 min-h-screen">
      <Sidebar
        roles={roles || []}
        squads={squads?.documents || []}
        memberships={memberships?.documents || []}
      />
      <main className="flex-1">
        <nav className="flex flex-row-reverse justify-between shadow-sm items-center w-full px-4 h-16">
          <UserMenuButton />
          <MobileSideBar
            roles={roles || []}
            squads={squads?.documents || []}
            memberships={memberships?.documents || []}
          />
        </nav>
        {children}
      </main>
    </div>
  );
}
