import { Models } from "node-appwrite";

export interface ISquad extends Models.Document {
  name: string;
  avatar?: string;
  workspaceId: string;
}

export interface ISquadService {
  createSquad(
    workspaceId: string,
    name: string,
    avatar?: string
  ): Promise<ISquad>;
  getSquads(workspaceId: string): Promise<Models.DocumentList<ISquad> | null>;
  getSquad(squadId: string): Promise<ISquad | null>;
  deleteSquad(squadId: string): Promise<void>;
  // We can add more methods later as needed
}
