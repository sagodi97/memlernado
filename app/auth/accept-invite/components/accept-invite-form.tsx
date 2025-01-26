"use client";
import { acceptMembership } from "@/actions";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { Loader2Icon } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";

interface IAcceptInviteForm {
  membershipId: string;
  userId: string;
  secret: string;
  teamId: string;
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
  teamId,
  userId,
}: IAcceptInviteForm) {
  const [formState, formAction] = useFormState(acceptMembership, {
    message: "",
  });

  return (
    <div className="flex flex-col gap-2">
      <form action={formAction}>
        <input type="hidden" name="userId" value={userId} />
        <input type="hidden" name="membershipId" value={membershipId} />
        <input type="hidden" name="secret" value={secret} />
        <input type="hidden" name="teamId" value={teamId} />

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
        {formState.message && (
          <p className="text-red-500 text-sm text-center">
            {formState.message}
          </p>
        )}
      </form>
    </div>
  );
}
