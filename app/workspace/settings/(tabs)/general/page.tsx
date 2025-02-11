import GeneralSection from "../../components/GeneralSection";
import { workspaceService } from "@/lib/server/services/appwrite";

export default async function GeneralPage() {
  const workspaces = await workspaceService.getUserWorkspaces();
  if (!workspaces?.teams[0]) return null;

  return <GeneralSection team={workspaces.teams[0]} />;
}
