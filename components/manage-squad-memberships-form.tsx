"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ISquad } from "@/lib/server/services/appwrite/interfaces/squad.interface";
import { TSquadMember } from "@/actions/squad-membership/get-squad-memberships";
import { TWorkspaceMember } from "@/actions/workspace/get-workspace-members";
import {
  createSquadMembership,
  deleteSquadMembership,
} from "@/actions/squad-membership";
import { ESquadRole } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

function AddMemberButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="ghost" size="sm" disabled={pending}>
      Add {pending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
    </Button>
  );
}

function RemoveMemberButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="ghost"
      size="sm"
      className="text-destructive"
      disabled={pending}
    >
      Remove {pending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
    </Button>
  );
}

export function ManageSquadMembershipsForm({
  squad,
  members,
  workspaceMembers,
}: {
  squad: ISquad;
  members: TSquadMember[];
  workspaceMembers: TWorkspaceMember[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const isSearching = searchQuery.length >= 2;
  const filteredMembers = isSearching
    ? workspaceMembers.filter(
        (member) =>
          member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search members to add..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
        {isSearching && filteredMembers.length > 0 && (
          <div className="absolute w-full z-10 mt-1">
            <ul className="max-h-40 overflow-y-auto border rounded-md bg-background shadow-lg">
              {filteredMembers.map((user) => (
                <li
                  key={user.$id}
                  className="flex items-center justify-between p-2 hover:bg-muted"
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user.avatar || undefined} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                  </div>
                  <form
                    action={async (formData) => {
                      formData.append("squadId", squad.$id);
                      formData.append("userId", user.$id);
                      formData.append("workspaceId", squad.workspaceId);
                      formData.append("role", ESquadRole.MEMBER);

                      const { error } = await createSquadMembership(formData);
                      if (error) {
                        toast({
                          title: "Error",
                          description: error,
                          variant: "destructive",
                        });
                      } else {
                        toast({ title: "Member added successfully" });
                        setSearchQuery("");
                      }
                    }}
                  >
                    <AddMemberButton />
                  </form>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={isSearching ? "opacity-50 pointer-events-none" : ""}>
        <h4 className="text-sm font-medium mb-2">Current Members</h4>
        <ul className="space-y-2">
          {members.map((member) => (
            <li key={member.$id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={member.avatar || undefined} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{member.name}</span>
              </div>
              <form
                action={async (formData) => {
                  formData.append("membershipId", member.membershipId);
                  const { error } = await deleteSquadMembership(formData);
                  if (error) {
                    toast({
                      title: "Error",
                      description: error,
                      variant: "destructive",
                    });
                  } else {
                    toast({ title: "Member removed successfully" });
                  }
                }}
              >
                <RemoveMemberButton />
              </form>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
