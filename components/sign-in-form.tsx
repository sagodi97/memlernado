import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { signInWithGithub } from "@/lib/server/oauth";
import { createAdminClient, getLoggedInUser } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/server/const";

async function signInWithEmail(formData: FormData) {
  "use server";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.table({ email, password });

  const { account } = await createAdminClient();
  const session = await account.createEmailPasswordSession(email, password);

  cookies().set(SESSION_COOKIE, session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  redirect("/team");
}

export async function SignInForm() {
  const user = await getLoggedInUser();
  if (user) redirect("/team");

  return (
    <form action={signInWithEmail} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input name="email" id="email" type="email" required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input name="password" id="password" type="password" required />
      </div>
      <Button type="submit">Sign In</Button>
    </form>
  );
}
