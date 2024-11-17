import { AlignLeft } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import UserIcon from "./UserIcon";
import { navLinks } from "@/utils/links";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import SignOut from "./SignOut";
import { auth } from "@clerk/nextjs/server";

function LinksDropdown() {
  const user = auth();
  const isAdminUser = user.userId === process.env.ADMIN_USER_CLERK_ID;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-x-2">
          <AlignLeft size={22} />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={10} className="w-40">
        <SignedIn>
          {navLinks.map((link, index) => {
            const { href, label } = link;
            return (
              <DropdownMenuItem key={index}>
                <Link
                  href={href}
                  className="my-[1px] w-full capitalize tracking-wide"
                >
                  {label}
                </Link>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          {isAdminUser && (
            <>
              <DropdownMenuItem>
                <Link
                  href="/admin"
                  className="my-[1px] w-full capitalize tracking-wide"
                >
                  admin
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem>
            <SignOut />
          </DropdownMenuItem>
        </SignedIn>
        <SignedOut>
          <DropdownMenuItem
            asChild
            className="w-full cursor-pointer tracking-wide"
          >
            <SignInButton mode="modal">Sign in</SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            asChild
            className="w-full cursor-pointer tracking-wide"
          >
            <SignUpButton mode="modal">Register</SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default LinksDropdown;
