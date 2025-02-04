import { Models } from "node-appwrite";

export interface ISquadService {
  createSquad(
    workspaceId: string,
    name: string,
    avatar?: string
  ): Promise<Models.Document>;
  getSquads(workspaceId: string): Promise<Models.DocumentList<Models.Document>>;
  deleteSquad(squadId: string): Promise<void>;
  // We can add more methods later as needed
}
