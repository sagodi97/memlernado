"use server";
import { createSessionClient } from "@/lib/server/appwrite";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { parseError } from "@/lib/utils";

export async function inviteMembers(formData: FormData) {
  const email = formData.get("email") as string;
  const teamId = formData.get("teamId") as string;

  const { teams } = await createSessionClient();
  const origin = headers().get("origin");

  try {
    await teams.createMembership(
      teamId,
      ["student"],
      email,
      undefined,
      undefined,
      `${origin}/auth/accept-invite`
    );
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
