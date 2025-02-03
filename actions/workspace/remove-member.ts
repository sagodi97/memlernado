"use server";

import { workspaceService } from "@/lib/server/services/appwrite";
import { handleAction } from "../utils";
import { removeMemberSchema } from "./schemas";
import { ActionResult } from "../types";
import { revalidatePath } from "next/cache";

export async function removeMember(formData: FormData): Promise<ActionResult> {
  return handleAction({
    schema: removeMemberSchema,
    formData,
    action: async (data) => {
      await workspaceService.removeMember(data.workspaceId, data.membershipId);
      revalidatePath("/workspace/settings");
    },
  });
}
