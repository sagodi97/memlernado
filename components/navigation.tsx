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
} from "lucide-react";
import { ETeamRole } from "@/lib/types";

const APP_ROOT = "/workspace";

const links = [
  {
    href: APP_ROOT,
    label: "Your Work",
    icon: InboxIcon,
    allowedRoles: [ETeamRole.OWNER, ETeamRole.STUDENT],
  },
  {
    href: APP_ROOT + "/backlog",
    label: "Backlog",
    icon: LogsIcon,
    allowedRoles: [ETeamRole.OWNER, ETeamRole.STUDENT],
  },
  {
    href: APP_ROOT + "/board",
    label: "Board",
    icon: SquareKanbanIcon,
    allowedRoles: [ETeamRole.OWNER, ETeamRole.STUDENT],
  },
  {
    href: APP_ROOT + "/reports",
    label: "Reports",
    icon: ChartAreaIcon,
    allowedRoles: [ETeamRole.OWNER, ETeamRole.STUDENT],
  },
  {
    href: APP_ROOT + "/settings",
    label: "Settings",
    icon: SettingsIcon,
    allowedRoles: [ETeamRole.OWNER],
  },
];

interface INavigationProps {
  roles: ETeamRole[];
}

export function Navigation({ roles }: INavigationProps) {
  const pathname = usePathname();

  const filteredLinks = links.filter((link) =>
    link.allowedRoles.some((role) => roles.includes(role))
  );

  return (
    <nav className="flex flex-col gap-4">
      {filteredLinks.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex gap-2 items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:text-primary",
            pathname === href
              ? "text-primary bg-white"
              : "text-muted-foreground"
          )}
        >
          <Icon size={18} />
          {label}
        </Link>
      ))}
    </nav>
  );
}
