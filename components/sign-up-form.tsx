// import { signInWithGithub } from "@/lib/server/oauth";
import { createAdminClient, getLoggedInUser } from "@/lib/server/appwrite";
import { SESSION_COOKIE } from "@/lib/server/const";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

async function signUpWithEmail(formData: FormData) {
  "use server";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  console.log({
    email,
    password,
    name,
  });

  const { account } = await createAdminClient();

  await account.create(ID.unique(), email, password, name);
  const session = await account.createEmailPasswordSession(email, password);

  cookies().set(SESSION_COOKIE, session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  redirect("/team");
}

export async function SignUpForm() {
  const user = await getLoggedInUser();
  if (user) redirect("/team");

  return (
    <form action={signUpWithEmail} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input name="name" id="name" type="text" required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input name="email" id="email" type="email" required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input name="password" id="password" type="password" required />
      </div>
      <Button type="submit">Sign Up</Button>
    </form>
  );
}
