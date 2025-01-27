"use server";
import { redirect } from "next/navigation";
import { createSessionClient } from "@/lib/server/appwrite";
import { ID } from "node-appwrite";
import { headers } from "next/headers";

export async function createWorkspace(
  _: { message: string },
  formData: FormData
) {
  const workspaceName = formData.get("workspaceName") as string;
  const teamEmails = formData.get("teamEmails") as string;

  const { teams } = await createSessionClient();
  const origin = headers().get("origin");

  try {
    const newWorkspace = await teams.create(ID.unique(), workspaceName);

    if (teamEmails?.trim()) {
      const emails = teamEmails
        .split("\n")
        .map((email) => email.trim())
        .filter(Boolean);
      for (const email of emails) {
        await teams.createMembership(
          newWorkspace.$id,
          ["student"],
          email,
          undefined,
          undefined,
          `${origin}/auth/accept-invite`
        );
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error(e);
    return {
      message: e?.response?.message ?? "Something went wrong",
    };
  }
  redirect("/");
}
