"use client";

import { useForm } from "react-hook-form";
import RatingInput from "./RatingInput";
import { z } from "zod";
import { reviewSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { toast } from "../ui/use-toast";
import FormContainer from "../form/FormContainer";
import { createReview } from "@/utils/actions";
import { SubmitButton } from "../form/Buttons";
import TextAreaInput from "../form/TextAreaInput";

function CreateReview({ propertyID }: { propertyID: string }) {
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
  });

  useEffect(() => {
    if (form.formState.errors.rating) {
      toast({
        description: form.formState.errors.rating.message,
      });
    }
  }, [form.formState.errors.rating]);

  const createReviewWithPropertyID = createReview.bind(null, { propertyID });
  return (
    <FormContainer
      form={form}
      formSchema={reviewSchema}
      action={createReviewWithPropertyID}
    >
      <div className="flex flex-col gap-y-4 px-8 py-6 border rounded-lg">
        <RatingInput label="select rating" name="rating" form={form} />
        <TextAreaInput
          label="feedback"
          name="comment"
          rows={2}
          control={form.control}
        />
        <div className="w-max mt-2">
          <SubmitButton
            text="submit review"
            isSubmitting={form.formState.isSubmitting}
          />
        </div>
      </div>
    </FormContainer>
  );
}
export default CreateReview;
