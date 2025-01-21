"use client";
import { signUpWithEmail } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";

export function SignUpForm() {
  const [formState, formAction] = useFormState(signUpWithEmail, {
    message: "",
  });

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input name="name" id="name" type="text" required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input name="email" id="email" type="email" required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input name="password" id="password" type="password" required />
      </div>
      <Button type="submit" className="w-full">
        Sign Up
      </Button>
      {formState.message && (
        <p className="text-red-500 text-sm text-center">{formState.message}</p>
      )}
    </form>
  );
}
