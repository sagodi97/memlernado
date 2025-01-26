"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createWorkspace } from "@/actions";
import { useFormState } from "react-dom";

export function CreateWorkspaceForm() {
  const [formState, formAction] = useFormState(createWorkspace, {
    message: "",
  });

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Your Workspace</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
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
          <Button type="submit" className="w-full">
            Create Workspace
          </Button>
          {formState.message && (
            <p className="text-red-500 text-sm text-center">
              {formState.message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
