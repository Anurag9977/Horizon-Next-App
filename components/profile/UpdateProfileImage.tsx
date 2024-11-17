"use client";
import { updateProfileImage } from "@/utils/actions";
import { profileImageSchema } from "@/utils/schemas";
import FormContainer from "../form/FormContainer";
import { Input } from "../ui/input";
import { SubmitButton } from "../form/Buttons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import FileInput from "../form/FileInput";

function UpdateProfileImage() {
  const form = useForm<z.infer<typeof profileImageSchema>>({
    resolver: zodResolver(profileImageSchema),
  });

  return (
    <FormContainer
      form={form}
      formSchema={profileImageSchema}
      action={updateProfileImage}
    >
      <FileInput
        name="profileImage"
        label="profile image"
        control={form.control}
      />
      <div className="mt-4">
        <SubmitButton
          text="update image"
          isSubmitting={form.formState.isSubmitting}
        />
      </div>
    </FormContainer>
  );
}
export default UpdateProfileImage;
