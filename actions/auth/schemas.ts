import { z } from "zod";
import { emailSchema, passwordSchema } from "../types";

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(1),
});

export const acceptInviteSchema = z.object({
  userId: z.string().min(1),
  secret: z.string().min(1),
  membershipId: z.string().min(1),
  workspaceId: z.string().min(1),
  password: passwordSchema,
});
