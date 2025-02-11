"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2Icon } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useToast } from "@/hooks/use-toast";
import { deleteSquad } from "@/actions/squad";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function DeleteButton({ onClose }: { onClose: () => void }) {
  const { pending } = useFormStatus();
  const didCallActionRef = useRef(false);

  useEffect(() => {
    if (!pending && didCallActionRef.current) {
      onClose();
    }
  }, [pending, onClose]);

  return (
    <AlertDialogAction
      type="submit"
      onClick={() => (didCallActionRef.current = true)}
    >
      Delete {pending && <Loader2 className="ml-3 animate-spin" />}
    </AlertDialogAction>
  );
}

interface DeleteSquadFormProps {
  squad: {
    $id: string;
    name: string;
  };
}

export function DeleteSquadForm({ squad }: DeleteSquadFormProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive"
        >
          <Trash2Icon className="h-4 w-4" />
          <span className="sr-only">Delete squad</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete squad</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {squad.name}? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form
            action={async (formData) => {
              formData.append("squadId", squad.$id);
              const { error } = await deleteSquad(formData);
              if (error) {
                toast({
                  title: "Error",
                  description: error,
                  variant: "destructive",
                });
              } else {
                toast({ title: "Squad deleted successfully" });
                setOpen(false);
              }
            }}
          >
            <DeleteButton onClose={() => setOpen(false)} />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
