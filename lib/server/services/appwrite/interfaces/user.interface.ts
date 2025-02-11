import { Models } from "node-appwrite";
import { TUserPreferences } from "./auth.interface";

export interface IUserService {
  getUsersByIds(userIds: string[]): Promise<Models.User<TUserPreferences>[]>;
}
