"use server";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/server/const";

export async function signInWithEmail(
  currentState: { message: string },
  formData: FormData
) {
  "use server";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { account } = await createAdminClient();
  try {
    const session = await account.createEmailPasswordSession(email, password);
    cookies().set(SESSION_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    redirect("/team");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return {
      message: e?.response?.message ?? "Something went wrong",
    };
  }
}
