import { Models } from "node-appwrite";
import { EWorkspaceRole } from "@/lib/types";

export interface IWorkspaceService {
  getUserWorkspaces(): Promise<Models.TeamList<Models.Preferences> | null>;
  getWorkspaceMembers(
    workspaceId: string
  ): Promise<Models.MembershipList | null>;
  inviteMember(
    workspaceId: string,
    email: string,
    roles: string[],
    url: string
  ): Promise<Models.Membership>;
  createWorkspace(name: string): Promise<Models.Team<Models.Preferences>>;
  removeMember(workspaceId: string, membershipId: string): Promise<void>;
  getCurrentUserRoles(workspaceId: string): Promise<EWorkspaceRole[] | null>;
}
