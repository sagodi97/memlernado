"use server";
import { createSessionClient } from "@/lib/server/appwrite";
import { parseError } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function removeMember(formData: FormData) {
  const teamId = formData.get("teamId") as string;
  const membershipId = formData.get("membershipId") as string;

  const { teams } = await createSessionClient();

  try {
    await teams.deleteMembership(teamId, membershipId);
    revalidatePath("/workspace/settings");
    return {
      error: null,
    };
  } catch (e) {
    console.error(e);
    return {
      error: parseError(e),
    };
  }
}
