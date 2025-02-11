import { workspaceService, userService } from "@/lib/server/services/appwrite";
import { redirect } from "next/navigation";
import {
  TUser,
  TUserPreferences,
} from "@/lib/server/services/appwrite/interfaces/auth.interface";
import { EWorkspaceRole } from "@/lib/types";

export type TWorkspaceMember = Pick<TUser, "$id" | "name" | "email"> &
  Pick<TUserPreferences, "avatar"> & {
    roles: EWorkspaceRole[];
    membershipId: string;
  };

export async function getWorkspaceMembers(): Promise<TWorkspaceMember[]> {
  const workspaces = await workspaceService.getUserWorkspaces();
  if (!workspaces?.total) redirect("/onboarding");

  // Get team members for basic info
  const teamMembers = await workspaceService.getWorkspaceMembers(
    workspaces.teams[0].$id
  );
  if (!teamMembers) return [];

  // Get users with their preferences (for avatars)
  const userIds = teamMembers.memberships.map((m) => m.userId);
  const users = await userService.getUsersByIds(userIds);

  // Map memberships to include user details
  const members = teamMembers.memberships
    .map((teamMember) => {
      const user = users.find((user) => user.$id === teamMember.userId);

      if (!teamMember.userId || !teamMember.userName || !teamMember.userEmail) {
        return null;
      }

      return {
        $id: teamMember.userId,
        name: teamMember.userName,
        email: teamMember.userEmail,
        avatar: user?.prefs?.avatar ?? null,
        roles: teamMember.roles,
        membershipId: teamMember.$id,
      };
    })
    .filter((member): member is TWorkspaceMember => member !== null);

  return members;
}
