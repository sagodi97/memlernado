import { z } from "zod";

export const createSquadSchema = z.object({
  name: z.string().min(1).max(100),
  avatar: z.string().optional(),
});

export const deleteSquadSchema = z.object({
  squadId: z.string().min(1),
});
