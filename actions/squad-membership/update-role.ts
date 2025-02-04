"use server";

import { squadMembershipService } from "@/lib/server/services/appwrite";
import { handleAction } from "../utils";
import { updateSquadMembershipRoleSchema } from "./schemas";
import { ActionResult } from "../types";

export async function updateSquadMembershipRole(
  formData: FormData
): Promise<ActionResult> {
  return handleAction({
    schema: updateSquadMembershipRoleSchema,
    formData,
    action: async (data) => {
      await squadMembershipService.updateRole(data.membershipId, data.role);
    },
  });
}
