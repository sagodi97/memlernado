import { getTeamMembers, getUserTeams } from "@/lib/server/appwrite";
import GeneralSection from "./components/GeneralSection";
import MembersSection from "./components/MembersSection";
import { TabsContent } from "@/components/ui/tabs";

export default async function TeamSettingsPage() {
  const teams = await getUserTeams();
  const memberships = await getTeamMembers(teams?.teams?.[0].$id!);

  return (
    <div>
      <TabsContent value="general">
        <GeneralSection team={teams?.teams?.[0]!} />
      </TabsContent>
      <TabsContent value="members">
        <MembersSection
          members={memberships?.memberships!}
          teamId={teams?.teams?.[0].$id!}
        />
      </TabsContent>
    </div>
  );
}
