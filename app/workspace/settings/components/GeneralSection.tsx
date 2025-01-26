import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Models } from "node-appwrite";

interface ITeamProps {
  team: Models.Team<Models.Preferences>;
}

export default function GeneralSection({ team }: ITeamProps) {
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <h2 className="text-2xl font-semibold">General Settings</h2>
        <Badge variant="secondary">Coming soon</Badge>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="workspace-name">Workspace Name</Label>
          <Input disabled id="workspace-name" defaultValue={team.name} />
        </div>
        <div>
          <Label htmlFor="workspace-description">Description</Label>
          <Input
            id="workspace-description"
            disabled
            defaultValue="A collaborative space for our homeschool community"
          />
        </div>
        <Button disabled>Save Changes</Button>
      </div>
    </div>
  );
}
