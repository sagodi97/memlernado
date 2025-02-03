import "server-only";
import { Account } from "node-appwrite";
import { AppwriteClient } from "./client";
import { OAuthProvider } from "node-appwrite";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "../../const";

export class OAuthService {
  private createAccountClient(type: "admin" | "empty" = "admin") {
    return new Account(
      type === "admin"
        ? AppwriteClient.createAdminClient()
        : AppwriteClient.createEmptyClient()
    );
  }

  async createGoogleAuthUrl(successUrl: string, failureUrl: string) {
    const account = this.createAccountClient();
    return await account.createOAuth2Token(
      OAuthProvider.Google,
      successUrl,
      failureUrl
    );
  }

  async createSessionFromOAuth(userId: string, secret: string) {
    const account = this.createAccountClient();
    const session = await account.createSession(userId, secret);

    if (!session || !session.secret) {
      throw new Error("Failed to create session from token");
    }

    cookies().set(SESSION_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return session;
  }
}
