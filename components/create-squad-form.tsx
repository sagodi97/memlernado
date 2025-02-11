"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { createSquad } from "@/actions/squad";
import { useToast } from "@/hooks/use-toast";

function CreateButton({ onClose }: { onClose: () => void }) {
  const { pending } = useFormStatus();
  const didCallActionRef = useRef(false);

  useEffect(() => {
    if (!pending && didCallActionRef.current) {
      onClose();
    }
  }, [pending, onClose]);

  return (
    <Button onClick={() => (didCallActionRef.current = true)} type="submit">
      Create Squad {pending && <Loader2 className="ml-3 animate-spin" />}
    </Button>
  );
}

interface CreateSquadFormProps {
  workspaceId: string;
  trigger: React.ReactNode;
}

export function CreateSquadForm({
  workspaceId,
  trigger,
}: CreateSquadFormProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Squad</DialogTitle>
          <DialogDescription>
            Create a new squad to organize your team members.
          </DialogDescription>
        </DialogHeader>
        <form
          action={async (formData) => {
            formData.append("workspaceId", workspaceId);
            const { error } = await createSquad(formData);
            if (error) {
              toast({
                title: "Error",
                description: error,
                variant: "destructive",
              });
            } else {
              toast({ title: "Squad created successfully" });
              setOpen(false);
            }
          }}
        >
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter squad name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="avatar">Avatar</Label>
              {/* <Input id="avatar" name="avatar" type="file" accept="image/*" /> */}
            </div>
          </div>
          <DialogFooter>
            <CreateButton onClose={() => setOpen(false)} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
