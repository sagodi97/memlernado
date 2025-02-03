"use client";
import { acceptInvite } from "@/actions";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { toast } from "@/hooks/use-toast";
import { Loader2Icon } from "lucide-react";
import { useFormStatus } from "react-dom";

interface IAcceptInviteForm {
  membershipId: string;
  userId: string;
  secret: string;
  workspaceId: string;
}

const Submit = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      Accept Invite
      {pending && <Loader2Icon className="animate-spin" />}
    </Button>
  );
};

export function AcceptInviteForm({
  membershipId,
  secret,
  workspaceId,
  userId,
}: IAcceptInviteForm) {
  return (
    <div className="flex flex-col gap-2">
      <form
        action={async (formData) => {
          const { error } = await acceptInvite(formData);
          if (error) {
            toast({ title: error, variant: "destructive" });
          }
        }}
      >
        <input type="hidden" name="userId" value={userId} />
        <input type="hidden" name="membershipId" value={membershipId} />
        <input type="hidden" name="secret" value={secret} />
        <input type="hidden" name="workspaceId" value={workspaceId} />

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm" htmlFor="password">
              Set up a password to access to your Memlernado account
            </label>
            <PasswordInput
              minLength={8}
              name="password"
              id="password"
              required
            />
          </div>
          <Submit />
        </div>
      </form>
    </div>
  );
}
