"use client";

import { deletePropertySchema, DeletePropertyType } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormContainer from "../form/FormContainer";
import { deleteRental } from "@/utils/actions";
import { IconButton } from "../form/Buttons";

function DeleteRentalForm({ propertyID }: { propertyID: string }) {
  const defaultValues: DeletePropertyType = {
    propertyID,
  };
  const form = useForm<z.infer<typeof deletePropertySchema>>({
    resolver: zodResolver(deletePropertySchema),
    defaultValues,
  });

  return (
    <FormContainer
      form={form}
      formSchema={deletePropertySchema}
      action={deleteRental}
    >
      <IconButton
        buttonType="submit"
        iconType="delete"
        isSubmitting={form.formState.isSubmitting}
      />
    </FormContainer>
  );
}
export default DeleteRentalForm;
