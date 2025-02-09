"use client";
import { Navigation } from "./navigation";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { EWorkspaceRole } from "@/lib/types";
import { useState } from "react";
import { Models } from "node-appwrite";

interface ISidebarProps {
  roles: EWorkspaceRole[];
  squads: Models.Document[];
  memberships: Models.Document[];
}

const Header = () => (
  <div className="flex flex-col justify-center lg:justify-start lg:flex-row gap-2 lg:gap-1 items-center mb-10">
    <Image src="/images/logo.svg" height={50} width={50} alt="Memlernado" />
    <p className="font-semibold text-xl">Memlernado</p>
  </div>
);

export const Sidebar = ({ roles, squads, memberships }: ISidebarProps) => {
  return (
    <aside className="h-screen p-4 border-r border-slate-200 border-dashed w-64 min-w-64 hidden lg:block">
      <Header />
      <Navigation roles={roles} squads={squads} memberships={memberships} />
    </aside>
  );
};

export const MobileSideBar = ({
  roles,
  squads,
  memberships,
}: ISidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="px-4 h-16 ">
          <MenuIcon size={25} />
        </SheetTrigger>
        <SheetContent side={"left"} className="w-60 min-w-60 ">
          <SheetHeader>
            <Header />
          </SheetHeader>
          <Navigation
            roles={roles || []}
            squads={squads || []}
            memberships={memberships || []}
            onLinkClick={() => setIsOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};
