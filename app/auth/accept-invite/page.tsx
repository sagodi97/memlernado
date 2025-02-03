import { redirect } from "next/navigation";
import { AcceptInviteForm } from "./components/accept-invite-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { workspaceService } from "@/lib/server/services/appwrite";
interface IAcceptInviteSearchParams {
  membershipId?: string;
  userId?: string;
  secret?: string;
  workspaceId?: string;
}

export default async function AcceptInvite({
  searchParams,
}: {
  searchParams: IAcceptInviteSearchParams;
}) {
  const workspaces = await workspaceService.getUserWorkspaces();
  if (workspaces?.total) redirect("/workspace");
  const { membershipId, userId, secret, workspaceId } = searchParams;

  if (!membershipId || !userId || !secret || !workspaceId)
    return (
      <div className="w-full h-full flex justify-center items-center">
        There was an error accepting your invitation
      </div>
    );

  return (
    <div className="flex justify-center p-5">
      <Card className="flex flex-col w-full sm:w-96">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 ">Welcome!</CardTitle>
          <CardDescription>
            Yo have ve been invited to join an exciting journey where learning
            meets teamwork. Accept the invite to get started and become part of
            a collaborative workspace designed to help you grow and succeed!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between">
          <AcceptInviteForm
            membershipId={membershipId}
            userId={userId}
            secret={secret}
            workspaceId={workspaceId}
          />
        </CardContent>
      </Card>
    </div>
  );
}
