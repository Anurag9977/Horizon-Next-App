"use client";

import { createBookingSchema, CreateBookingType } from "@/utils/schemas";
import { useBookingStore } from "@/utils/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormContainer from "../form/FormContainer";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { createBooking } from "@/utils/actions";
import { DateRange } from "react-day-picker";
import { SubmitButton } from "../form/Buttons";
import Link from "next/link";

function BookingForm() {
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

  const { propertyID, range } = useBookingStore((store) => store);

  const defaultValues: CreateBookingType = {
    propertyID,
  };
  const form = useForm<z.infer<typeof createBookingSchema>>({
    resolver: zodResolver(createBookingSchema),
    defaultValues,
  });

  const createBookingWithRange = createBooking.bind(null, {
    bookingRange: range as DateRange,
  });

  return (
    <FormContainer
      form={form}
      formSchema={createBookingSchema}
      action={createBookingWithRange}
    >
      <SubmitButton
        text="confirm booking"
        size="lg"
        isSubmitting={form.formState.isSubmitting}
        className="w-full uppercase tracking-wider"
      />
    </FormContainer>
    // <Button
    //   asChild
    //   size="lg"
    //   className="font-semibold uppercase tracking-wider w-full"
    // >
    //   <Link href="/checkout">confirm booking</Link>
    // </Button>
  );
}
export default BookingForm;
