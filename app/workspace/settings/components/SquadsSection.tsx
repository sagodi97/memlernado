import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UsersIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ISquad } from "@/lib/server/services/appwrite/interfaces/squad.interface";
import dayjs from "dayjs";
import { getSquadMembers } from "@/actions/squad-membership/get-squad-memberships";
import { getWorkspaceMembers } from "@/actions/workspace/get-workspace-members";
import { CreateSquadForm } from "@/components/create-squad-form";
import { DeleteSquadForm } from "@/components/delete-squad-form";
import { ManageSquadMembershipsForm } from "@/components/manage-squad-memberships-form";

interface SquadsSectionProps {
  squads: ISquad[];
  workspaceId: string;
}

export default function SquadsSection({
  squads,
  workspaceId,
}: SquadsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Squads</h2>
        <CreateSquadForm workspaceId={workspaceId} />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {squads.map((squad) => (
              <TableRow key={squad.$id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={squad.avatar || undefined}
                        alt={squad.name}
                      />
                      <AvatarFallback>
                        {squad.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{squad.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {dayjs(squad.createdAt).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="mr-2">
                        <UsersIcon className="h-4 w-4" />
                        <span className="sr-only">Manage members</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Manage Squad Members</DialogTitle>
                        <DialogDescription>
                          Add or remove members from the {squad.name} squad.
                        </DialogDescription>
                      </DialogHeader>
                      <ManageSquadMembershipsButton squad={squad} />
                    </DialogContent>
                  </Dialog>
                  <DeleteSquadForm squad={squad} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

async function ManageSquadMembershipsButton({ squad }: { squad: ISquad }) {
  const squadMembers = await getSquadMembers(squad.$id);
  const workspaceMembers = await getWorkspaceMembers();

  const availableMembers = workspaceMembers.filter(
    (wMember) => !squadMembers.some((sMember) => sMember.$id === wMember.$id)
  );

  return (
    <ManageSquadMembershipsForm
      squad={squad}
      members={squadMembers}
      workspaceMembers={availableMembers}
    />
  );
}
