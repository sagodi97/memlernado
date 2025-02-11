"use server";

import { squadService } from "@/lib/server/services/appwrite";
import { handleAction } from "../utils";
import { deleteSquadSchema } from "./schemas";
import { ActionResult } from "../types";
import { revalidatePath } from "next/cache";

export async function deleteSquad(formData: FormData): Promise<ActionResult> {
  return handleAction({
    schema: deleteSquadSchema,
    formData,
    action: async (data) => {
      await squadService.deleteSquad(data.squadId);
      revalidatePath("/workspace/settings");
    },
  });
}
