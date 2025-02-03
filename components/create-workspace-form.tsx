"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createWorkspace } from "@/actions";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function CreateWorkspaceForm() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Your Workspace</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          action={async (formData) => {
            const { error } = await createWorkspace(formData);
            if (error) {
              toast({
                title: error,
              });
            }
          }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="workspaceName">Workspace Name</Label>
            <Input
              name="workspaceName"
              id="workspaceName"
              placeholder="Enter workspace name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="teamEmails">Invite Team Members (Optional)</Label>
            <Textarea
              name="teamEmails"
              id="teamEmails"
              placeholder="Enter email addresses, one per line"
              rows={4}
            />
          </div>
          <Submit />
        </form>
      </CardContent>
    </Card>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      Create Workspace {pending && <Loader2 className="ml-3 animate-spin" />}
    </Button>
  );
}
