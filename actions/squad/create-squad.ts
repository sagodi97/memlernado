"use server";

import { workspaceService, squadService } from "@/lib/server/services/appwrite";
import { handleAction } from "../utils";
import { createSquadSchema } from "./schemas";
import { ActionResult } from "../types";
import { EWorkspaceRole } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createSquad(
  formData: FormData
): Promise<ActionResult<string>> {
  return handleAction({
    schema: createSquadSchema,
    formData,
    action: async (data) => {
      const workspaces = await workspaceService.getUserWorkspaces();
      if (!workspaces?.teams.length) {
        throw new Error("No workspace found");
      }
      const workspaceId = workspaces.teams[0].$id;

      const roles = await workspaceService.getCurrentUserRoles(workspaceId);
      if (!roles?.includes(EWorkspaceRole.OWNER)) {
        throw new Error("Only workspace owners can create squads");
      }

      const newSquad = await squadService.createSquad(
        workspaceId,
        data.name,
        data.avatar
      );
      revalidatePath("/workspace");
      return newSquad.$id;
    },
  });
}
