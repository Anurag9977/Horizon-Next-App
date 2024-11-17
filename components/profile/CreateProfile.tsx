"use client";

import { profileSchema, ProfileType } from "@/utils/schemas";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import { createProfile } from "@/utils/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "../form/FormInput";

function CreateProfile() {
  const defaultValues: ProfileType = {
    firstName: "",
    lastName: "",
    username: "",
  };
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  return (
    <FormContainer
      formSchema={profileSchema}
      form={form}
      action={createProfile}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 px-8 py-6 border rounded-lg">
        <FormInput
          name="firstName"
          label="first name"
          type="text"
          control={form.control}
        />
        <FormInput
          name="lastName"
          label="last name"
          type="text"
          control={form.control}
        />
        <FormInput
          name="username"
          label="user name"
          type="text"
          control={form.control}
        />
        <div className="w-max mt-2 self-end">
          <SubmitButton
            text="create profile"
            isSubmitting={form.formState.isSubmitting}
          />
        </div>
      </div>
    </FormContainer>
  );
}
export default CreateProfile;
