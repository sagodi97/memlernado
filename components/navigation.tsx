"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ChartAreaIcon,
  InboxIcon,
  LogsIcon,
  SettingsIcon,
  SquareKanbanIcon,
  UsersIcon,
} from "lucide-react";
import { EWorkspaceRole } from "@/lib/types";
import { useCurrentSquad } from "@/hooks/use-current-squad";
import { SquadSelector } from "./squad-selector";
import { Models } from "node-appwrite";

const APP_ROOT = "/workspace";

const links = [
  {
    href: APP_ROOT,
    label: "Your Work",
    icon: InboxIcon,
    allowedRoles: [EWorkspaceRole.OWNER, EWorkspaceRole.STUDENT],
  },
  {
    href: "",
    type: "squad",
    label: "Squad",
    icon: UsersIcon,
    allowedRoles: [EWorkspaceRole.OWNER, EWorkspaceRole.STUDENT],
    children: [
      {
        href: "/backlog",
        label: "Backlog",
        icon: LogsIcon,
      },
      {
        href: "/board",
        label: "Board",
        icon: SquareKanbanIcon,
      },
    ],
  },
  {
    href: APP_ROOT + "/reports",
    label: "Reports",
    icon: ChartAreaIcon,
    allowedRoles: [EWorkspaceRole.OWNER, EWorkspaceRole.STUDENT],
  },
  {
    href: APP_ROOT + "/settings",
    label: "Settings",
    icon: SettingsIcon,
    allowedRoles: [EWorkspaceRole.OWNER],
  },
];

interface INavigationProps {
  roles: EWorkspaceRole[];
  squads: Models.Document[];
  memberships: Models.Document[];
  onLinkClick?: () => void;
}

export function Navigation({
  roles,
  squads,
  memberships,
  onLinkClick,
}: INavigationProps) {
  const pathname = usePathname();
  const currentSquad = useCurrentSquad();

  const filteredLinks = links.filter((link) =>
    link.allowedRoles.some((role) => roles.includes(role))
  );

  return (
    <nav className="flex flex-col gap-4">
      {filteredLinks.map((link) => {
        if (link.type === "squad") {
          return (
            <div key="squad-selector" className="flex flex-col gap-2">
              <SquadSelector
                roles={roles}
                squads={squads}
                memberships={memberships}
                onLinkClick={onLinkClick}
              />
              {currentSquad &&
                link.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={`/workspace/${currentSquad}${child.href}`}
                    className={cn(
                      "flex gap-2 items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:text-primary",
                      pathname === `/workspace/${currentSquad}${child.href}`
                        ? "text-primary bg-white"
                        : "text-muted-foreground"
                    )}
                    onClick={onLinkClick}
                  >
                    <child.icon size={18} />
                    {child.label}
                  </Link>
                ))}
            </div>
          );
        }

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex gap-2 items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:text-primary",
              pathname === link.href
                ? "text-primary bg-white"
                : "text-muted-foreground"
            )}
            onClick={onLinkClick}
          >
            <link.icon size={18} />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
