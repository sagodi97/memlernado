import { z } from "zod";

export type ActionError = {
  error: string;
  data?: never;
};

export type ActionSuccess<T> = {
  error?: never;
  data: T;
};

export type ActionResult<T = void> = ActionError | ActionSuccess<T>;

// Common schemas
export const emailSchema = z.string().email();
export const passwordSchema = z.string().min(8);
export const workspaceIdSchema = z.string().min(1);
