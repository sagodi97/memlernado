import { ESquadRole } from "@/lib/types";
import { Models } from "node-appwrite";
export interface ISquadMembership extends Models.Document {
  squadId: string;
  userId: string;
  role: ESquadRole;
  workspaceId: string;
}

export interface ISquadMembershipService {
  createMembership(
    squadId: string,
    userId: string,
    workspaceId: string,
    role: ESquadRole
  ): Promise<ISquadMembership>;

  getMemberships(
    squadId: string
  ): Promise<Models.DocumentList<ISquadMembership>>;

  getUserMemberships(
    userId: string,
    workspaceId: string
  ): Promise<Models.DocumentList<ISquadMembership>>;

  deleteMembership(membershipId: string): Promise<void>;

  updateRole(membershipId: string, role: ESquadRole): Promise<ISquadMembership>;
}
