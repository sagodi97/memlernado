import "server-only";
import { ID, Databases, Query } from "node-appwrite";
import { AppwriteClient } from "./client";
import { ISquadService } from "./interfaces/squad.interface";

export class SquadService implements ISquadService {
  private createDatabasesClient(type: "session" | "admin" = "session") {
    const client =
      type === "session"
        ? AppwriteClient.createSessionClient()
        : AppwriteClient.createAdminClient();

    return new Databases(client);
  }

  async createSquad(workspaceId: string, name: string, avatar?: string) {
    const databases = this.createDatabasesClient();

    return databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_SQUADS_COLLECTION_ID!,
      ID.unique(),
      {
        workspaceId,
        name,
        avatar,
      }
    );
  }

  async getSquads(workspaceId: string) {
    const databases = this.createDatabasesClient();

    return databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_SQUADS_COLLECTION_ID!,
      [
        // Query to filter squads by workspaceId
        Query.equal("workspaceId", workspaceId),
      ]
    );
  }

  async deleteSquad(squadId: string) {
    const databases = this.createDatabasesClient();

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_SQUADS_COLLECTION_ID!,
      squadId
    );
  }
}
