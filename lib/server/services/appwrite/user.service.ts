import "server-only";
import { Users } from "node-appwrite";
import { AppwriteClient } from "./client";
import { IUserService } from "./interfaces/user.interface";
import { TUserPreferences } from "./interfaces/auth.interface";

export class UserService implements IUserService {
  private createUsersClient(type: "session" | "admin" = "admin") {
    const client =
      type === "session"
        ? AppwriteClient.createSessionClient()
        : AppwriteClient.createAdminClient();

    return new Users(client);
  }

  async getUsersByIds(userIds: string[]) {
    const users = this.createUsersClient();
    const usersList = await Promise.all(
      userIds.map((id) => users.get<TUserPreferences>(id))
    );
    return usersList;
  }
}
