"use client";

import { useCurrentSquad } from "@/hooks/use-current-squad";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import type { Models } from "node-appwrite";
import { CheckIcon, PlusIcon, ChevronDownIcon } from "lucide-react";
import { EWorkspaceRole } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { PlaceholderAvatar } from "@/components/ui/placeholder-avatar";

interface SquadSelectorProps {
  roles: EWorkspaceRole[];
  squads: Models.Document[];
  memberships: Models.Document[];
  onLinkClick?: () => void;
}

export function SquadSelector({
  roles,
  squads,
  memberships,
  onLinkClick,
}: SquadSelectorProps) {
  const currentSquad = useCurrentSquad();

  const currentSquadData = squads.find((s) => s.$id === currentSquad);

  return (
    <div className="space-y-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <div className="flex items-center space-x-2">
              {currentSquadData &&
                (currentSquadData.avatar ? (
                  <Image
                    src={currentSquadData.avatar || "/placeholder.svg"}
                    alt={currentSquadData.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                ) : (
                  <PlaceholderAvatar name={currentSquadData.name} size={24} />
                ))}
              <span className="truncate">
                {currentSquadData ? currentSquadData.name : "Select Squad"}
              </span>
            </div>
            <ChevronDownIcon className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          {squads.map((squad) => (
            <DropdownMenuItem asChild key={squad.$id}>
              <Link
                href={`/workspace/${squad.$id}`}
                className="flex items-center space-x-2 px-2 py-2 hover:bg-accent hover:text-accent-foreground"
                onClick={onLinkClick}
              >
                {squad.avatar ? (
                  <Image
                    src={squad.avatar || "/placeholder.svg"}
                    alt={squad.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                ) : (
                  <PlaceholderAvatar name={squad.name} size={24} />
                )}
                <span className="flex-grow truncate">{squad.name}</span>
                {memberships.some((m) => m.squadId === squad.$id) && (
                  <CheckIcon className="h-4 w-4 text-primary" />
                )}
              </Link>
            </DropdownMenuItem>
          ))}
          {roles.includes(EWorkspaceRole.OWNER) && (
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href="/workspace/settings/squads" onClick={onLinkClick}>
                <div className="flex items-center space-x-2 text-primary">
                  <PlusIcon className="h-4 w-4" />
                  <span>Create New Squad</span>
                </div>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
