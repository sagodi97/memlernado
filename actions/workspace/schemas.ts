import { z } from "zod";
import { emailSchema, workspaceIdSchema } from "../types";

export const createWorkspaceSchema = z.object({
  workspaceName: z.string().min(1),
  workspaceEmails: z.string(),
});

export const inviteMemberSchema = z.object({
  email: emailSchema,
  workspaceId: workspaceIdSchema,
});

export const removeMemberSchema = z.object({
  workspaceId: workspaceIdSchema,
  membershipId: z.string().min(1),
});
