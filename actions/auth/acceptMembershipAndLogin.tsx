"use server";

import {
  createAdminClient,
  createEmptySessionClient,
} from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/server/const";

export const acceptMembership = async (
  currentState: { message: string },
  formData: FormData
) => {
  "use server";

  const userId = formData.get("userId") as string;
  const secret = formData.get("secret") as string;
  const membershipId = formData.get("membershipId") as string;
  const teamId = formData.get("teamId") as string;
  const password = formData.get("password") as string;

  try {
    const { account, users } = await createAdminClient();
    const { teams } = await createEmptySessionClient();
    await teams.updateMembershipStatus(teamId, membershipId, userId, secret);
    const { email } = await users.get(userId);
    await users.updatePassword(userId, password);
    const session = await account.createEmailPasswordSession(email, password);
    cookies().set(SESSION_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error(e);
    return {
      message: e?.response?.message ?? "Something went wrong",
    };
  }
  redirect("/workspace");
};
