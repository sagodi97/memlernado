"use server";

import {
  workspaceService,
  squadMembershipService,
} from "@/lib/server/services/appwrite";
import { handleAction } from "../utils";
import { createSquadMembershipSchema } from "./schemas";
import { ActionResult } from "../types";
import { EWorkspaceRole } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createSquadMembership(
  formData: FormData
): Promise<ActionResult> {
  return handleAction({
    schema: createSquadMembershipSchema,
    formData,
    action: async (data) => {
      // Check if user has owner role in workspace
      const roles = await workspaceService.getCurrentUserRoles(
        data.workspaceId
      );

      if (!roles?.includes(EWorkspaceRole.OWNER)) {
        throw new Error("Only workspace owners can manage squad memberships");
      }

      // Check if membership already exists
      const existingMemberships = await squadMembershipService.getMemberships(
        data.squadId
      );
      const exists = existingMemberships.documents.some(
        (m) => m.userId === data.userId
      );

      if (exists) {
        throw new Error("User is already a member of this squad");
      }

      await squadMembershipService.createMembership(
        data.squadId,
        data.userId,
        data.workspaceId,
        data.role
      );

      revalidatePath("/workspace/settings");
    },
  });
}
