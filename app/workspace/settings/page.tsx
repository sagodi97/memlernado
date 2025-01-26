import { getTeamMembers, getUserTeams } from "@/lib/server/appwrite";
import GeneralSection from "./components/GeneralSection";
import MembersSection from "./components/MembersSection";
import { TabsContent } from "@/components/ui/tabs";

export default async function TeamSettingsPage() {
  const teams = await getUserTeams();
  const teamId = teams?.teams?.[0].$id;
  if (!teamId) return null;
  const memberships = await getTeamMembers(teamId);
  if (!memberships) return null;

  return (
    <div>
      <TabsContent value="general">
        <GeneralSection team={teams.teams[0]} />
      </TabsContent>
      <TabsContent value="members">
        <MembersSection
          members={memberships.memberships}
          teamId={teams.teams[0].$id}
        />
      </TabsContent>
    </div>
  );
}
