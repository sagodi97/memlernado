"use server";

import { workspaceService } from "@/lib/server/services/appwrite";
import { handleAction } from "../utils";
import { createWorkspaceSchema } from "./schemas";
import { redirect } from "next/navigation";
import { ActionError, ActionSuccess } from "../types";
import { headers } from "next/headers";

export async function createWorkspace(
  formData: FormData
): Promise<ActionError | ActionSuccess<void>> {
  return handleAction({
    schema: createWorkspaceSchema,
    formData,
    action: async (data) => {
      const newWorkspace = await workspaceService.createWorkspace(
        data.workspaceName
      );

      if (data.workspaceEmails?.trim()) {
        const emails = data.workspaceEmails
          .split("\n")
          .map((email) => email.trim())
          .filter(Boolean);

        for (const email of emails) {
          await workspaceService.inviteMember(
            newWorkspace.$id,
            email,
            ["student"],
            `${headers().get("origin")}/auth/accept-invite`
          );
        }
      }
      redirect("/");
    },
  });
}
