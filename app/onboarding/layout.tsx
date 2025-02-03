import { authService, workspaceService } from "@/lib/server/services/appwrite";
import { redirect } from "next/navigation";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await authService.getCurrentUser();
  if (!user) redirect("/landing");
  const userTeams = await workspaceService.getUserWorkspaces();
  if (userTeams?.total) redirect("/workspace");
  return <div>{children}</div>;
}
