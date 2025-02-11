import {
  workspaceService,
  squadMembershipService,
  userService,
} from "@/lib/server/services/appwrite";
import {
  TUser,
  TUserPreferences,
} from "@/lib/server/services/appwrite/interfaces/auth.interface";
import { ISquadMembership } from "@/lib/server/services/appwrite/interfaces/squad-membership.interface";
import { redirect } from "next/navigation";

export type TSquadMember = Pick<TUser, "$id" | "name" | "email"> &
  Pick<TUserPreferences, "avatar"> &
  Pick<ISquadMembership, "role"> & {
    membershipId: string;
  };

export async function getSquadMembers(
  squadId: string
): Promise<TSquadMember[]> {
  const workspaces = await workspaceService.getUserWorkspaces();
  if (!workspaces?.total) redirect("/onboarding");

  // Get all memberships for the squad
  const memberships = await squadMembershipService.getMemberships(squadId);

  // Get team members for basic info
  const teamMembers = await workspaceService.getWorkspaceMembers(
    workspaces.teams[0].$id
  );
  if (!teamMembers) return [];

  // Get users with their preferences (for avatars)
  const userIds = memberships.documents.map((m) => m.userId);
  const users = await userService.getUsersByIds(userIds);

  // Map memberships to include user details
  const members = memberships.documents
    .map((membership) => {
      const teamMember = teamMembers.memberships.find(
        (m) => m.userId === membership.userId
      );
      const user = users.find((user) => user.$id === membership.userId);

      if (
        !teamMember?.userId ||
        !teamMember.userName ||
        !teamMember.userEmail
      ) {
        return null;
      }

      return {
        $id: teamMember.userId,
        name: teamMember.userName,
        email: teamMember.userEmail,
        avatar: user?.prefs?.avatar ?? null,
        role: membership.role,
        membershipId: membership.$id,
      };
    })
    .filter((member): member is TSquadMember => member !== null);

  return members;
}
