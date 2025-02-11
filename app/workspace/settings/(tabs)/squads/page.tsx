import SquadsSection from "../../components/SquadsSection";
import { workspaceService, squadService } from "@/lib/server/services/appwrite";
import { redirect } from "next/navigation";

export default async function SquadsPage() {
  const workspaces = await workspaceService.getUserWorkspaces();
  if (!workspaces?.total) redirect("/onboarding");

  const squads = await squadService.getSquads(workspaces.teams[0].$id);
  if (!squads) return null;

  return (
    <SquadsSection
      squads={squads.documents}
      workspaceId={workspaces.teams[0].$id}
    />
  );
}
