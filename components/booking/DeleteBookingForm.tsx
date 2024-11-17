"use client";

import { deleteBookingSchema, DeleteBookingType } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormContainer from "../form/FormContainer";
import { IconButton } from "../form/Buttons";
import { deleteBooking } from "@/utils/actions";

function DeleteBookingForm({ bookingID }: { bookingID: string }) {
  const defaultValues: DeleteBookingType = {
    bookingID,
  };
  const form = useForm<z.infer<typeof deleteBookingSchema>>({
    resolver: zodResolver(deleteBookingSchema),
    defaultValues,
  });

  return (
    <FormContainer
      form={form}
      formSchema={deleteBookingSchema}
      action={deleteBooking}
    >
      <IconButton
        buttonType="submit"
        iconType="delete"
        isSubmitting={form.formState.isSubmitting}
      />
    </FormContainer>
  );
}
export default DeleteBookingForm;
