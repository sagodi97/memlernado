"use server";

import { workspaceService, squadService } from "@/lib/server/services/appwrite";
import { handleAction } from "../utils";
import { createSquadSchema } from "./schemas";
import { ActionResult } from "../types";
import { EWorkspaceRole } from "@/lib/types";

export async function createSquad(formData: FormData): Promise<ActionResult> {
  return handleAction({
    schema: createSquadSchema,
    formData,
    action: async (data) => {
      // Check if user has owner role
      const roles = await workspaceService.getCurrentUserRoles(
        data.workspaceId
      );

      if (!roles?.includes(EWorkspaceRole.OWNER)) {
        throw new Error("Only workspace owners can create squads");
      }

      await squadService.createSquad(data.workspaceId, data.name, data.avatar);
    },
  });
}
