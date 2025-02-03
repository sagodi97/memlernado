import { workspaceService } from "@/lib/server/services/appwrite";

export default async function TeamHomepage() {
  const workspaces = await workspaceService.getUserWorkspaces();

  return (
    <div className="container mx-auto p-6">
      <h1>What is going on at {workspaces?.teams?.[0]?.name}</h1>
      {/* Add your team-specific content here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Current Sprint</h2>
          {/* Add sprint content */}
        </div>
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">My Tasks</h2>
          {/* Add tasks content */}
        </div>
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Team Members</h2>
          {/* Add team members content */}
        </div>
      </div>
    </div>
  );
}
