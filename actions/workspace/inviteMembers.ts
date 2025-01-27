"use server";
import { createSessionClient } from "@/lib/server/appwrite";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function inviteMembers(
  _: { message: string },
  formData: FormData
) {
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
    return { message: `${email} has been invited.` };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error(e);
    return {
      message: e?.response?.message ?? "Something went wrong",
    };
  }
}
