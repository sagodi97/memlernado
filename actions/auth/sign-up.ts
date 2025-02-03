"use server";

import { authService } from "@/lib/server/services/appwrite";
import { handleAction } from "../utils";
import { signUpSchema } from "./schemas";
import { redirect } from "next/navigation";
import { ActionResult } from "../types";

export async function signUp(formData: FormData): Promise<ActionResult> {
  return handleAction({
    schema: signUpSchema,
    formData,
    action: async (data) => {
      await authService.signUp(data.email, data.password, data.name);
      redirect("/");
    },
  });
}
