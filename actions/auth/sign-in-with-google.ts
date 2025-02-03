"use server";

import { oAuthService } from "@/lib/server/services/appwrite";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signInWithGoogle() {
  const origin = headers().get("origin");
  const successUrl = `${origin}/oauth`;
  const failureUrl = `${origin}/auth`;

  const redirectUrl = await oAuthService.createGoogleAuthUrl(
    successUrl,
    failureUrl
  );
  redirect(redirectUrl);
}
