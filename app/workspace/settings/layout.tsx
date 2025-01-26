import type { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface WorkspaceSettingsLayoutProps {
  children: ReactNode;
}

export default function WorkspaceSettingsLayout({
  children,
}: WorkspaceSettingsLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Workspace Settings</h1>
      <Tabs defaultValue="members" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="billing" disabled>
            Billing
          </TabsTrigger>
          <TabsTrigger value="integrations" disabled>
            Integrations
          </TabsTrigger>
        </TabsList>
        {children}
      </Tabs>
    </div>
  );
}
