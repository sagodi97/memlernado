"use client";

import { createSquad } from "@/actions/squad";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2Icon } from "lucide-react";
import { useFormStatus } from "react-dom";

export function CreateSquadForm({ onSuccess }: { onSuccess: () => void }) {
  const { toast } = useToast();

  return (
    <form
      action={async (formData) => {
        const { error } = await createSquad(formData);
        if (error) {
          toast({
            title: "Creation failed",
            description: error,
          });
        } else {
          toast({
            title: "Squad created!",
            description: `Your new squad ${formData.get("name")} is ready.`,
          });
          onSuccess?.();
        }
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Squad Name</Label>
        <Input id="name" name="name" placeholder="Awesome Team" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="avatar">Avatar URL (optional)</Label>
        <Input
          id="avatar"
          name="avatar"
          placeholder="https://example.com/avatar.png"
        />
      </div>
      <CreateSquadButton />
    </form>
  );
}

function CreateSquadButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      Create Squad{" "}
      {pending && <Loader2Icon className="ml-2 h-4 w-4 animate-spin" />}
    </Button>
  );
}
