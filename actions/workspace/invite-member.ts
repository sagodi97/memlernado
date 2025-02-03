"use server";

import { workspaceService } from "@/lib/server/services/appwrite";
import { handleAction } from "../utils";
import { inviteMemberSchema } from "./schemas";
import { ActionResult } from "../types";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function inviteMember(formData: FormData): Promise<ActionResult> {
  return handleAction({
    schema: inviteMemberSchema,
    formData,
    action: async (data) => {
      await workspaceService.inviteMember(
        data.workspaceId,
        data.email,
        ["student"],
        `${headers().get("origin")}/auth/accept-invite`
      );
      revalidatePath("/workspace/settings");
    },
  });
}
