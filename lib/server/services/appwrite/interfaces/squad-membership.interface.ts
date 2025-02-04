import { Models } from "node-appwrite";

export interface ISquadMembershipService {
  createMembership(
    squadId: string,
    userId: string,
    workspaceId: string,
    role: string
  ): Promise<Models.Document>;

  getMemberships(
    squadId: string
  ): Promise<Models.DocumentList<Models.Document>>;

  getUserMemberships(
    userId: string,
    workspaceId: string
  ): Promise<Models.DocumentList<Models.Document>>;

  deleteMembership(membershipId: string): Promise<void>;

  updateRole(membershipId: string, role: string): Promise<Models.Document>;
}
