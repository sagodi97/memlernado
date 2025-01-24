"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ChartAreaIcon,
  InboxIcon,
  LogsIcon,
  SquareKanbanIcon,
} from "lucide-react";

const links = [
  { href: "/team", label: "Your Work", icon: InboxIcon },
  { href: "/backlog", label: "Backlog", icon: LogsIcon },
  { href: "/board", label: "Board", icon: SquareKanbanIcon },
  { href: "/reports", label: "Reports", icon: ChartAreaIcon },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-4">
      {links.map(({ href, label, icon: Icon }) => (
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
