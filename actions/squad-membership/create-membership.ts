"use server";

import {
  workspaceService,
  squadMembershipService,
} from "@/lib/server/services/appwrite";
import { handleAction } from "../utils";
import { createSquadMembershipSchema } from "./schemas";
import { ActionResult } from "../types";
import { EWorkspaceRole } from "@/lib/types";

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

      await squadMembershipService.createMembership(
        data.squadId,
        data.userId,
        data.workspaceId,
        data.role
      );
    },
  });
}
