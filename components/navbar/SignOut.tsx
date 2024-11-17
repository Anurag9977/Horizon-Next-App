"use client";

import { SignOutButton } from "@clerk/nextjs";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

function SignOut() {
  const { push } = useRouter();

  function handleSignOut() {
    push("/");
    toast({ description: "Logging out..." });
  }
  return (
    <SignOutButton>
      <button
        type="button"
        className="w-full text-left cursor-pointer tracking-wide"
        onClick={() => handleSignOut()}
      >
        Sign Out
      </button>
    </SignOutButton>
  );
}
export default SignOut;
