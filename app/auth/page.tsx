import { SignUpForm } from "@/components/sign-up-form";
import { SignInForm } from "@/components/sign-in-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import { signInWithGoogle } from "@/actions/auth/sign-in-with-google";
import { authService } from "@/lib/server/services/appwrite";
import { SignInWithGoogleButton } from "./components/SignInWithGoogle";
export default async function AuthPage() {
  const user = await authService.getCurrentUser();
  if (user) redirect("/");

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Welcome to Memlernado
      </h1>
      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <SignInForm />
        </TabsContent>
        <TabsContent value="signup">
          <SignUpForm />
        </TabsContent>
      </Tabs>
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      <form action={signInWithGoogle} className="space-y-4">
        <SignInWithGoogleButton />
      </form>
    </div>
  );
}
