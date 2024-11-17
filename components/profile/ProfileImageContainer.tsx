"use client";

import Image from "next/image";
import UpdateProfileImage from "./UpdateProfileImage";
import { useState } from "react";
import { Button } from "../ui/button";
import { SquareUserRound } from "lucide-react";

function ProfileImageContainer({ profileImage }: { profileImage: string }) {
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  return (
    <section className="h-full grid gap-y-4 justify-between px-8 py-6 border rounded-lg">
      {profileImage ? (
        <div className="relative h-36 w-36">
          <Image
            src={profileImage}
            alt="User-Profile"
            priority
            fill
            sizes="(max-width : 768px) 100vw, (max-width : 1024px) 50vw, 33vw"
            className="object-cover rounded-lg w-full h-full"
          />
        </div>
      ) : (
        <SquareUserRound strokeWidth={1} size={160} />
      )}
      <Button
        type="button"
        className="capitalize tracking-wide font-semibold w-max self-end"
        variant={showUpdateButton ? "outline" : "secondary"}
        onClick={() => setShowUpdateButton(!showUpdateButton)}
      >
        {showUpdateButton ? "cancel" : "edit profile image?"}
      </Button>
      {showUpdateButton && <UpdateProfileImage />}
    </section>
  );
}
export default ProfileImageContainer;
