import { z } from "zod";
import { workspaceIdSchema } from "../types";
import { ESquadRole } from "@/lib/types";

export const createSquadMembershipSchema = z.object({
  squadId: z.string().min(1),
  userId: z.string().min(1),
  workspaceId: workspaceIdSchema,
  role: z.nativeEnum(ESquadRole),
});

export const updateSquadMembershipRoleSchema = z.object({
  membershipId: z.string().min(1),
  role: z.nativeEnum(ESquadRole),
});

export const deleteSquadMembershipSchema = z.object({
  membershipId: z.string().min(1),
});
