"use client";

import { useEffect, useRef, useState } from "react";
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
import { inviteMembers, removeMember } from "@/actions";
import { useFormStatus } from "react-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, Trash2Icon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface IAddTeamMembersProps {
  members: Models.Membership[];
  teamId: string;
  currentUserId: string;
}

export default function MembersSection({
  members,
  teamId,
  currentUserId,
}: IAddTeamMembersProps) {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

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
              action={async (formData) => {
                const { error } = await inviteMembers(formData);
                if (error) {
                  toast({ title: error, variant: "destructive" });
                } else {
                  const email = formData.get("email");
                  toast({ title: `${email} has been invited.` });
                }
              }}
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
              <InviteButton onClose={() => setIsInviteDialogOpen(false)} />
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
            <TableHead />
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
              <TableCell>
                {member.userId !== currentUserId && (
                  <RemoveMemberForm
                    member={member}
                    onSuccess={() => {
                      toast({
                        title: "Succesfully removed member",
                      });
                    }}
                    onError={(err) => {
                      toast({
                        title: "Failed to remove user",
                        description: err || "An unexpected error occured",
                        variant: "destructive",
                      });
                    }}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function InviteButton({ onClose }: { onClose: () => void }) {
  const { pending } = useFormStatus();
  const didCallActionRef = useRef(false);

  useEffect(() => {
    if (!pending && didCallActionRef.current) {
      onClose();
    }
  }, [pending, onClose]);

  return (
    <Button onClick={() => (didCallActionRef.current = true)} type="submit">
      Send Invitation {pending && <Loader2 className="ml-3 animate-spin" />}
    </Button>
  );
}

function RemoveButton({ onClose }: { onClose: () => void }) {
  const { pending } = useFormStatus();
  const didCallActionRef = useRef(false);

  useEffect(() => {
    if (!pending && didCallActionRef.current) {
      onClose();
    }
  }, [pending, onClose]);

  return (
    <AlertDialogAction
      type="submit"
      onClick={() => (didCallActionRef.current = true)}
    >
      Remove {pending && <Loader2 className="ml-3 animate-spin" />}
    </AlertDialogAction>
  );
}

function RemoveMemberForm({
  member,
  onError,
  onSuccess,
}: {
  member: Models.Membership;
  onError: (msg: string) => void;
  onSuccess: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Trash2Icon
          cursor={"pointer"}
          size={24}
          onClick={() => setOpen(true)}
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove team member</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove {member.userEmail} from the team?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form
            action={async (formData) => {
              console.log("Sent form");
              const { error } = await removeMember(formData);
              if (error) {
                onError(error);
              } else {
                onSuccess();
              }
            }}
          >
            <input type="hidden" name="teamId" value={member.teamId} />
            <input type="hidden" name="membershipId" value={member.$id} />
            <RemoveButton onClose={() => setOpen(false)} />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
