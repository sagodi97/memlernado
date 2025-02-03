import { getLoggedInUser, getUserWorkspaces } from "@/lib/server/appwrite";

import { redirect } from "next/navigation";

// This Page is meant to be the single entry point to the app (excluding the landing page)
// Here we do the neccessary auth and data checks before deciding where to route the incoming user.
export default async function Home() {
  const user = await getLoggedInUser();
  if (!user) redirect("/landing");
  const userTeams = await getUserWorkspaces();
  if (!userTeams?.total) redirect("/onboarding");
  redirect("/workspace");
}
