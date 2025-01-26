import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCircle, Users } from "lucide-react";
import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Welcome to Memlernado
      </h1>
      <div className="flex flex-col items-center lg:items-start lg:flex-row lg:justify-center gap-12">
        <Card className="flex flex-col w-full sm:w-96">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 ">
              <UserCircle className="h-6 w-6" />I am a Homeschool Community
              Manager
            </CardTitle>
            <CardDescription>
              I am responsible for organizing and managing my homeschool
              community.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-between">
            <p className="mb-4">
              I want to create a Workspace for my students to collaborate, plan,
              and learn together.
            </p>
            <Button asChild className="w-full">
              <Link href={"/onboarding/create-workspace"}>
                Create a Workspace
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col w-full sm:w-96">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6" />I am a Student
            </CardTitle>
            <CardDescription>
              I want to join an existing Workspace.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-between">
            <p className="mb-4">
              I want to join an existing Workspace created by my homeschool
              manager or teacher to collaborate with my Squad and access shared
              resources.
            </p>
            <Button variant="outline" className="w-full">
              <Link href={"/onboarding/join-workspace"}>Join a Workspace</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
