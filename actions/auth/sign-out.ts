"use server";

import { authService } from "@/lib/server/services/appwrite";
import { redirect } from "next/navigation";

export async function signOut() {
  await authService.signOut();
  redirect("/auth");
}
