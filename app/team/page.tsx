import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createSessionClient, getLoggedInUser } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/server/const";

async function signOut() {
  "use server";

  const { account } = await createSessionClient();

  cookies().delete(SESSION_COOKIE);
  await account.deleteSession("current");

  redirect("/auth");
}

export default async function TeamHomepage() {
  const user = await getLoggedInUser();
  if (!user) redirect("/auth");

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Team Dashboard</h1>
        <div className="flex items-center gap-4">
          <span>Welcome, {user?.name}</span>
          <form action={signOut}>
            <Button type="submit" variant="outline">
              Sign Out
            </Button>
          </form>
        </div>
      </div>

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
