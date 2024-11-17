"use client";

import { useForm } from "react-hook-form";
import RatingInput from "./RatingInput";
import { z } from "zod";
import { reviewSchema, ReviewType } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import FormContainer from "../form/FormContainer";
import { editReview } from "@/utils/actions";
import { SubmitButton } from "../form/Buttons";
import TextAreaInput from "../form/TextAreaInput";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { LuPenSquare } from "react-icons/lu";

function EditReviewForm({
  reviewID,
  rating,
  comment,
}: {
  reviewID: string;
  rating: number;
  comment: string;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const pathName = usePathname();

  const defaultValues: ReviewType = {
    rating,
    comment,
  };
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues,
  });

  useEffect(() => {
    if (form.formState.errors.rating) {
      toast({
        description: form.formState.errors.rating.message,
      });
    }
    if (form.formState.isSubmitSuccessful) {
      setDialogOpen(false);
    }
  }, [form.formState.errors.rating, form.formState.isSubmitSuccessful]);

  const editReviewWithPathNameAndID = editReview.bind(null, {
    pathName,
    reviewID,
  });
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <LuPenSquare size={16} className="text-blue-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg w-4/5 sm:max-w-[500px] px-8 py-6">
        <DialogHeader>
          <DialogTitle className="tracking-wide capitalize font-bold">
            edit review
          </DialogTitle>
          <DialogDescription>Update rating and feedback</DialogDescription>
        </DialogHeader>
        <FormContainer
          form={form}
          formSchema={reviewSchema}
          action={editReviewWithPathNameAndID}
        >
          <div className="flex flex-col gap-y-4">
            <RatingInput label="select rating" name="rating" form={form} />
            <TextAreaInput
              label="feedback"
              name="comment"
              rows={4}
              control={form.control}
            />
            <div className="w-max mt-2">
              <SubmitButton
                text="edit review"
                isSubmitting={form.formState.isSubmitting}
              />
            </div>
          </div>
        </FormContainer>
      </DialogContent>
    </Dialog>
  );
}
export default EditReviewForm;
