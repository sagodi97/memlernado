import { MobileSideBar, Sidebar } from "@/components/sidebar";
import { UserMenuButton } from "@/components/user-menu-button";
import { authService, workspaceService } from "@/lib/server/services/appwrite";

import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await authService.getCurrentUser();
  if (!user) redirect("/landing");
  const userTeams = await workspaceService.getUserWorkspaces();
  if (!userTeams?.total) redirect("/onboarding");

  return (
    <div className="flex gap-3 min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <nav className="flex flex-row-reverse justify-between shadow-sm items-center w-full px-4 h-16">
          <UserMenuButton />
          <MobileSideBar />
        </nav>
        {children}
      </main>
    </div>
  );
}
