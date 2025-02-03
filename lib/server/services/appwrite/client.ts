import "server-only";
import { Client } from "node-appwrite";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "../../const";

export class AppwriteClient {
  private static createClient(session?: string) {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

    if (session) {
      client.setSession(session);
    }

    return client;
  }

  static createSessionClient() {
    const session = cookies().get(SESSION_COOKIE);
    if (!session?.value) {
      throw new Error("No session");
    }

    return this.createClient(session.value);
  }

  static createEmptyClient() {
    return this.createClient("");
  }

  static createAdminClient() {
    const client = this.createClient();
    client.setKey(process.env.NEXT_APPWRITE_KEY!);
    return client;
  }
}
