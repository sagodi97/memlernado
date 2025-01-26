import { Card, CardContent } from "@/components/ui/card";

export default function JoinWorkspacePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Join a Workspace</h1>
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
          <p className="mb-4">
            To join a Workspace, you will need an invitation from your
            homeschool community manager. Please contact your Homeschool Admin
            and provide them with your email address so they can add you to the
            right Workspace.
          </p>
          <p className="mb-6">
            If you are unsure who your Homeschool Admin is, check with your
            parent or guardian—they should have the information you need!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
