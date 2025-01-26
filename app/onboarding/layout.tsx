import { getLoggedInUser, getUserTeams } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getLoggedInUser();
  if (!user) redirect("/landing");
  const userTeams = await getUserTeams();
  if (userTeams?.total) redirect("/workspace");
  return <div>{children}</div>;
}
