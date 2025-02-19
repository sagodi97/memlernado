"use server";

import { squadMembershipService } from "@/lib/server/services/appwrite";
import { handleAction } from "../utils";
import { deleteSquadMembershipSchema } from "./schemas";
import { ActionResult } from "../types";
import { revalidatePath } from "next/cache";

export async function deleteSquadMembership(
  formData: FormData
): Promise<ActionResult> {
  return handleAction({
    schema: deleteSquadMembershipSchema,
    formData,
    action: async (data) => {
      await squadMembershipService.deleteMembership(data.membershipId);
      revalidatePath("/workspace/settings");
    },
  });
}
