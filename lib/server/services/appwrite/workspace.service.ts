import "server-only";
import { ID, Teams, Account } from "node-appwrite";
import { AppwriteClient } from "./client";
import { EWorkspaceRole } from "@/lib/types";
import { IWorkspaceService } from "./interfaces/workspace.interface";

export class WorkspaceService implements IWorkspaceService {
  private createTeamsClient(type: "session" | "admin" = "session") {
    const client =
      type === "session"
        ? AppwriteClient.createSessionClient()
        : AppwriteClient.createAdminClient();

    return new Teams(client);
  }

  async getUserWorkspaces() {
    try {
      const workspaces = this.createTeamsClient();
      return workspaces.list();
    } catch {
      return null;
    }
  }

  async getWorkspaceMembers(workspaceId: string) {
    try {
      const workspaces = this.createTeamsClient();
      return workspaces.listMemberships(workspaceId);
    } catch {
      return null;
    }
  }

  async inviteMember(
    workspaceId: string,
    email: string,
    roles: string[],
    url: string
  ) {
    const workspaces = this.createTeamsClient();
    return workspaces.createMembership(
      workspaceId,
      roles,
      email,
      undefined,
      undefined,
      url
    );
  }

  async createWorkspace(name: string) {
    const workspaces = this.createTeamsClient();
    return workspaces.create(ID.unique(), name);
  }

  async removeMember(workspaceId: string, membershipId: string) {
    const workspaces = this.createTeamsClient();
    await workspaces.deleteMembership(workspaceId, membershipId);
  }

  async getCurrentUserRoles(
    workspaceId: string
  ): Promise<EWorkspaceRole[] | null> {
    try {
      const workspaces = this.createTeamsClient();
      const account = new Account(AppwriteClient.createSessionClient());
      const { $id: userId } = await account.get();
      const { memberships } = await workspaces.listMemberships(workspaceId);
      return (
        (memberships.find((m) => m.userId === userId)
          ?.roles as EWorkspaceRole[]) || null
      );
    } catch {
      return null;
    }
  }
}
