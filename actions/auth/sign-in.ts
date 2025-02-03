"use server";

import { authService } from "@/lib/server/services/appwrite";
import { handleAction } from "../utils";
import { signInSchema } from "./schemas";
import { redirect } from "next/navigation";
import { ActionError, ActionSuccess } from "../types";

export async function signIn(
  formData: FormData
): Promise<ActionError | ActionSuccess<void>> {
  return handleAction({
    schema: signInSchema,
    formData,
    action: async (data) => {
      await authService.signIn(data.email, data.password);
      redirect("/");
    },
  });
}
