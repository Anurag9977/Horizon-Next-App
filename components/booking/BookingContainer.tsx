"use client";

import { SignInButton, useAuth } from "@clerk/nextjs";
import BookingForm from "./BookingForm";
import BookingTotals from "./BookingTotals";
import { Button } from "../ui/button";

function BookingContainer() {
  const { userId } = useAuth();
  if (!userId) {
    return (
      <SignInButton mode="modal">
        <Button
          variant="secondary"
          size="lg"
          className="font-semibold uppercase tracking-wider w-full"
        >
          login to confirm booking
        </Button>
      </SignInButton>
    );
  }

  return (
    <>
      <BookingTotals />
      <BookingForm />
    </>
  );
}
export default BookingContainer;
