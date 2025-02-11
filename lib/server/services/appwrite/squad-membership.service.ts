import "server-only";
import { ID, Databases, Query } from "node-appwrite";
import { AppwriteClient } from "./client";
import {
  ISquadMembership,
  ISquadMembershipService,
} from "./interfaces/squad-membership.interface";
import { ESquadRole } from "@/lib/types";

export class SquadMembershipService implements ISquadMembershipService {
  private createDatabasesClient(type: "session" | "admin" = "session") {
    const client =
      type === "session"
        ? AppwriteClient.createSessionClient()
        : AppwriteClient.createAdminClient();

    return new Databases(client);
  }

  async createMembership(
    squadId: string,
    userId: string,
    workspaceId: string,
    role: string
  ) {
    const databases = this.createDatabasesClient();

    return databases.createDocument<ISquadMembership>(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_SQUADS_MEMBERSHIPS_COLLECTION_ID!,
      ID.unique(),
      {
        squadId,
        userId,
        workspaceId,
        role,
      }
    );
  }

  async getMemberships(squadId: string) {
    const databases = this.createDatabasesClient();

    return databases.listDocuments<ISquadMembership>(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_SQUADS_MEMBERSHIPS_COLLECTION_ID!,
      [Query.equal("squadId", squadId)]
    );
  }

  async getUserMemberships(userId: string, workspaceId: string) {
    const databases = this.createDatabasesClient();

    return databases.listDocuments<ISquadMembership>(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_SQUADS_MEMBERSHIPS_COLLECTION_ID!,
      [Query.equal("userId", userId), Query.equal("workspaceId", workspaceId)]
    );
  }

  async deleteMembership(membershipId: string) {
    const databases = this.createDatabasesClient();

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_SQUADS_MEMBERSHIPS_COLLECTION_ID!,
      membershipId
    );
  }

  async updateRole(membershipId: string, role: ESquadRole) {
    const databases = this.createDatabasesClient();

    return databases.updateDocument<ISquadMembership>(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_SQUADS_MEMBERSHIPS_COLLECTION_ID!,
      membershipId,
      {
        role,
      }
    );
  }
}
