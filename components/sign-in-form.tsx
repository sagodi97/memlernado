"use client";
import { signInWithEmail } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";

export function SignInForm() {
  const [formState, formAction] = useFormState(signInWithEmail, {
    message: "",
  });
  return (
    <form action={formAction} onError={() => {}} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input name="email" id="email" type="email" required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input name="password" id="password" type="password" required />
      </div>
      <Button type="submit" className="w-full">
        Sign In
      </Button>
      {formState.message && (
        <p className="text-red-500 text-sm text-center">{formState.message}</p>
      )}
    </form>
  );
}
