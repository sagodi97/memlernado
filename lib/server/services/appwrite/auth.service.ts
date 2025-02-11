import "server-only";
import { AppwriteClient } from "./client";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "../../const";
import { ID, Teams, Users, Account } from "node-appwrite";
import { IAuthService, TUserPreferences } from "./interfaces/auth.interface";

export class AuthService implements IAuthService {
  private createAccountClient(type: "session" | "admin" | "empty" = "session") {
    const client =
      type === "session"
        ? AppwriteClient.createSessionClient()
        : type === "admin"
        ? AppwriteClient.createAdminClient()
        : AppwriteClient.createEmptyClient();

    return new Account(client);
  }

  async getCurrentUser() {
    try {
      const account = this.createAccountClient();
      return await account.get<TUserPreferences>();
    } catch {
      return null;
    }
  }

  async signIn(email: string, password: string) {
    const account = this.createAccountClient("admin");
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set(SESSION_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return session;
  }

  async signOut() {
    const account = this.createAccountClient();
    cookies().delete(SESSION_COOKIE);
    await account.deleteSession("current");
  }

  async signUp(email: string, password: string, name: string) {
    const account = this.createAccountClient("admin");
    await account.create(ID.unique(), email, password, name);
    return this.signIn(email, password);
  }

  async acceptInvite(
    userId: string,
    secret: string,
    membershipId: string,
    workspaceId: string,
    password: string
  ) {
    const workspaces = new Teams(AppwriteClient.createEmptyClient());
    const users = new Users(AppwriteClient.createAdminClient());

    await workspaces.updateMembershipStatus(
      workspaceId,
      membershipId,
      userId,
      secret
    );
    const { email } = await users.get(userId);
    await users.updatePassword(userId, password);
    return this.signIn(email, password);
  }
}
