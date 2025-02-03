import { Client } from "node-appwrite";

export interface IAppwriteClient {
  createSessionClient(): Client;
  createEmptyClient(): Client;
  createAdminClient(): Client;
}
