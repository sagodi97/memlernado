"use client";

import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelectedLayoutSegments, useRouter } from "next/navigation";
import { startTransition } from "react";

export function SettingsNav() {
  const segments = useSelectedLayoutSegments();
  const currentTab = segments[segments.length - 1] ?? "members";
  const router = useRouter();

  const handleTabChange = (value: string) => {
    startTransition(() => {
      router.push(`/workspace/settings/${value}`);
    });
  };

  return (
    <Tabs value={currentTab} className="w-full" onValueChange={handleTabChange}>
      <TabsList className="mb-6">
        <Link href="/workspace/settings/general">
          <TabsTrigger value="general">General</TabsTrigger>
        </Link>
        <Link href="/workspace/settings/members">
          <TabsTrigger value="members">Members</TabsTrigger>
        </Link>
        <Link href="/workspace/settings/squads">
          <TabsTrigger value="squads">Squads</TabsTrigger>
        </Link>
        <TabsTrigger value="billing" disabled>
          Billing
        </TabsTrigger>
        <TabsTrigger value="integrations" disabled>
          Integrations
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
