"use client";

import { useState } from "react";
import { useCurrentSquad } from "@/hooks/use-current-squad";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateSquadForm } from "@/components/create-squad-form";
import { Models } from "node-appwrite";
import { CheckIcon, PlusIcon } from "lucide-react";
import { EWorkspaceRole } from "@/lib/types";
import Link from "next/link";

interface SquadSelectorProps {
  roles: EWorkspaceRole[];
  squads: Models.Document[];
  memberships: Models.Document[];
}

export function SquadSelector({
  roles,
  squads,
  memberships,
}: SquadSelectorProps) {
  const currentSquad = useCurrentSquad();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleSuccess = () => {
    setShowCreateModal(false);
  };

  if (squads.length === 0) {
    // TODO: implement empty state
    return <></>;
  }

  return (
    <div className="space-y-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-full justify-between">
            <span className="truncate">
              {currentSquad
                ? squads.find((s) => s.$id === currentSquad)?.name
                : "Select Squad"}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          {squads.map((squad) => (
            <DropdownMenuItem asChild key={squad.$id}>
              <Link
                href={`/workspace/${squad.$id}`}
                className="flex justify-between items-center px-4 py-2 hover:bg-accent"
              >
                <span className="truncate">{squad.name}</span>
                {memberships.some((m) => m.squadId === squad.$id) && (
                  <CheckIcon className="h-4 w-4 text-green-500 ml-2" />
                )}
              </Link>
            </DropdownMenuItem>
          ))}
          {roles.includes(EWorkspaceRole.OWNER) && (
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => setShowCreateModal(true)}
            >
              <div className="flex items-center gap-2 text-primary">
                <PlusIcon className="h-4 w-4" />
                Create New Squad
              </div>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Squad</DialogTitle>
          </DialogHeader>
          <CreateSquadForm onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
