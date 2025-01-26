import { getLoggedInUser, getUserTeams } from "@/lib/server/appwrite";

import { redirect } from "next/navigation";

// This Page is meant to be the single entry point to the app (excluding the landing page)
// Here we do the neccessary auth and data checks before deciding where to route the incoming user.
export default async function Home() {
  const user = await getLoggedInUser();
  if (!user) redirect("/landing");
  const userTeams = await getUserTeams();
  console.log(userTeams);
  if (!userTeams.total) redirect("/onboarding");
  redirect("/team");
}
