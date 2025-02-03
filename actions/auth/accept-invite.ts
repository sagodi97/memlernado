"use server";

import { authService } from "@/lib/server/services/appwrite";
import { handleAction } from "../utils";
import { acceptInviteSchema } from "./schemas";
import { redirect } from "next/navigation";
import { ActionResult } from "../types";

export async function acceptInvite(formData: FormData): Promise<ActionResult> {
  return handleAction({
    schema: acceptInviteSchema,
    formData,
    action: async (data) => {
      await authService.acceptInvite(
        data.userId,
        data.secret,
        data.membershipId,
        data.workspaceId,
        data.password
      );
      redirect("/workspace");
    },
  });
}
