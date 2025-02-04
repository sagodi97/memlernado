import { Models } from "node-appwrite";

export interface ISquadService {
  createSquad(
    workspaceId: string,
    name: string,
    avatar?: string
  ): Promise<Models.Document>;
  getSquads(
    workspaceId: string
  ): Promise<Models.DocumentList<Models.Document> | null>;
  getSquad(squadId: string): Promise<Models.Document | null>;
  deleteSquad(squadId: string): Promise<void>;
  // We can add more methods later as needed
}
