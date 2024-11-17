"use client";

import { GoHeart, GoHeartFill } from "react-icons/go";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { LuPenSquare, LuTrash2 } from "react-icons/lu";
import { cn } from "@/lib/utils";

type SubmitButtonProps = {
  text: string;
  size?: "sm" | "lg" | "default";
  isSubmitting: boolean;
  className?: string;
};

export function SubmitButton({
  text,
  size = "default",
  isSubmitting,
  className,
}: SubmitButtonProps) {
  return (
    <Button
      id="submit-btn"
      type="submit"
      disabled={isSubmitting}
      size={size}
      className={cn("tracking-wide capitalize font-semibold", className)}
    >
      {isSubmitting ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        text
      )}
    </Button>
  );
}

export function FavouriteSignInButton({
  isIcon = false,
}: {
  isIcon?: boolean;
}) {
  if (isIcon)
    return (
      <Button variant="outline" size="icon">
        <GoHeartFill size={20} />
      </Button>
    );
  return (
    <button className="duration-300 hover:scale-105 ">
      <GoHeartFill
        size={24}
        stroke="#ffffff"
        strokeWidth={2}
        fill="#000000"
        fillOpacity="50%"
      />
    </button>
  );
}

export function FavouriteSubmitButton({
  isFavourite,
  isSubmitting,
  isIcon = false,
}: {
  isFavourite: boolean;
  isSubmitting: boolean;
  isIcon?: boolean;
}) {
  if (isIcon)
    return (
      <Button variant="outline" size="icon" disabled={isSubmitting}>
        {isFavourite ? <GoHeartFill size={20} /> : <GoHeart size={20} />}
      </Button>
    );
  return (
    <button
      type="submit"
      className="duration-300 hover:scale-105 "
      disabled={isSubmitting}
    >
      <GoHeartFill
        size={24}
        stroke="#ffffff"
        strokeWidth={2}
        fill={isFavourite ? "#ffffff" : "#000000"}
        fillOpacity={isFavourite ? "100%" : "50%"}
      />
    </button>
  );
}

export function IconButton({
  iconType,
  buttonType,
  isSubmitting,
}: {
  iconType: "edit" | "delete";
  buttonType: "button" | "submit";
  isSubmitting: boolean;
}) {
  function getIcon(): React.ReactNode {
    switch (iconType) {
      case "edit":
        return <LuPenSquare size={16} />;
      case "delete":
        return <LuTrash2 size={16} className="text-destructive" />;
      default: {
        const unExpectedIconType: never = iconType;
        throw new Error(
          `Unexpected icon type provided : ${unExpectedIconType}`
        );
      }
    }
  }

  return (
    <Button
      type={buttonType}
      variant="ghost"
      size="icon"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <ReloadIcon className="h-4 w-4 animate-spin" />
        </>
      ) : (
        getIcon()
      )}
    </Button>
  );
}
