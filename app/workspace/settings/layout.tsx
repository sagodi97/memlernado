"use client";

import type { ReactNode } from "react";
import { SettingsNav } from "./components/SettingsNav";

interface WorkspaceSettingsLayoutProps {
  children: ReactNode;
}

export default function WorkspaceSettingsLayout({
  children,
}: WorkspaceSettingsLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Workspace Settings</h1>
      <SettingsNav />
      <div className="mt-4">{children}</div>
    </div>
  );
}
