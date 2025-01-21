"use server";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/server/const";
import { ID } from "node-appwrite";

export async function signUpWithEmail(
  _: { message: string },
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  console.log({
    email,
    password,
    name,
  });

  const { account } = await createAdminClient();

  try {
    await account.create(ID.unique(), email, password, name);
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
