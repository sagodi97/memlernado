import { Models } from "node-appwrite";

export interface IAuthService {
  getCurrentUser(): Promise<Models.User<Models.Preferences> | null>;
  signIn(email: string, password: string): Promise<Models.Session>;
  signOut(): Promise<void>;
  signUp(
    email: string,
    password: string,
    name: string
  ): Promise<Models.Session>;
  acceptInvite(
    userId: string,
    secret: string,
    membershipId: string,
    workspaceId: string,
    password: string
  ): Promise<Models.Session>;
}
