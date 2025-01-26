"use client";

import { useState } from "react";
import dayjs from "dayjs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Models } from "node-appwrite";
import { inviteMembers } from "@/actions";
import { useFormState } from "react-dom";

interface IAddTeamMembersProps {
  members: Models.Membership[];
  teamId: string;
}

export default function MembersSection({
  members,
  teamId,
}: IAddTeamMembersProps) {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, formAction] = useFormState(inviteMembers, {
    message: "",
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Members</h2>
        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button>Invite New Member</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite New Member</DialogTitle>
            </DialogHeader>
            <form
              action={formAction}
              onSubmit={() => setIsInviteDialogOpen(false)}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="email">Email Address</Label>
                <input type="hidden" name="teamId" value={teamId} />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  required
                />
              </div>
              <Button type="submit">Send Invitation</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.$id}>
              <TableCell>{member.userName ?? "-"}</TableCell>
              <TableCell>{member.userEmail}</TableCell>
              <TableCell>{member.roles.join(", ")}</TableCell>
              <TableCell>
                {member.joined
                  ? dayjs(member.joined).format("DD/MM/YYYY")
                  : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
