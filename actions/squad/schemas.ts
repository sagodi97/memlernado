import { z } from "zod";
import { workspaceIdSchema } from "../types";

export const createSquadSchema = z.object({
  workspaceId: workspaceIdSchema,
  name: z.string().min(1).max(100),
  avatar: z.string().optional(),
});

export const deleteSquadSchema = z.object({
  squadId: z.string().min(1),
});
