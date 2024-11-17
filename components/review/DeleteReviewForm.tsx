"use client";

import { deleteReview } from "@/utils/actions";
import { deleteReviewSchema, DeleteReviewType } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormContainer from "../form/FormContainer";
import { IconButton } from "../form/Buttons";

function DeleteReviewForm({ reviewID }: { reviewID: string }) {
  const defaultValues: DeleteReviewType = {
    reviewID,
  };
  const form = useForm<z.infer<typeof deleteReviewSchema>>({
    resolver: zodResolver(deleteReviewSchema),
    defaultValues,
  });

  const pathName = usePathname();
  const deleteReviewWithPathName = deleteReview.bind(null, { pathName });
  return (
    <FormContainer
      form={form}
      formSchema={deleteReviewSchema}
      action={deleteReviewWithPathName}
    >
      <IconButton
        iconType="delete"
        buttonType="submit"
        isSubmitting={form.formState.isSubmitting}
      />
    </FormContainer>
  );
}
export default DeleteReviewForm;
