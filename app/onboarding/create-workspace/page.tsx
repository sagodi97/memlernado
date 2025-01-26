import { CreateWorkspaceForm } from "@/components/create-workspace-form";

export default function CreateWorkspacePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Create Your Workspace
      </h1>
      <CreateWorkspaceForm />
    </div>
  );
}
