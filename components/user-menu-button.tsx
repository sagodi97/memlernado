import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { signOut } from "@/actions";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

interface IUserAvatarProps {
  fallbackText: string;
  className?: string;
}
const UserAvatar = ({ fallbackText, className }: IUserAvatarProps) => (
  <Avatar
    className={cn(
      "hover:opacity-75 transition border border-neutral-300",
      className
    )}
  >
    {/* TODO: add back when profile pic buckets are up, and profile feature is done */}
    {/* <AvatarImage src={} /> */}
    <AvatarFallback>{fallbackText}</AvatarFallback>
  </Avatar>
);

export const UserMenuButton = async () => {
  const user = await getLoggedInUser();
  if (!user) return null;

  const { name, email } = user;
  const avatarFallbackText =
    name?.charAt(0)?.toUpperCase() ?? email?.charAt(0)?.toUpperCase() ?? "";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <UserAvatar fallbackText={avatarFallbackText} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 p-3">
          <UserAvatar
            fallbackText={avatarFallbackText}
            className="size-14 text-2xl"
          />
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-semibold">{name || "User"}</p>
            <p className="text-xs text-neutral-500">{email || ""}</p>
          </div>
          <Separator />
          <DropdownMenuItem
            asChild
            className="text-rose-700 font-medium cursor-pointer"
          >
            <form action={signOut}>
              <Button
                variant={"ghost"}
                type="submit"
                className="hover:text-rose-700 text-rose-700"
              >
                <LogOut />
                Sign Out
              </Button>
            </form>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
