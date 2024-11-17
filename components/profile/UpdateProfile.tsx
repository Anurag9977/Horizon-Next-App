"use client";

import { profileSchema, ProfileType } from "@/utils/schemas";
import FormContainer from "../form/FormContainer";
import { updateProfile } from "@/utils/actions";
import { SubmitButton } from "../form/Buttons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../form/FormInput";

type UpdateProfileProps = {
  firstName: string;
  lastName: string;
  username: string;
};

function UpdateProfile({ firstName, lastName, username }: UpdateProfileProps) {
  const defaultValues: ProfileType = {
    firstName,
    lastName,
    username,
  };
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  return (
    <FormContainer
      formSchema={profileSchema}
      form={form}
      action={updateProfile}
    >
      <div className="h-full px-8 py-6 border rounded-lg">
        <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
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
          <div></div>
          <div className="md:mt-2 md:self-end">
            <SubmitButton
              text="update profile"
              isSubmitting={form.formState.isSubmitting}
            />
          </div>
        </div>
      </div>
    </FormContainer>
  );
}
export default UpdateProfile;
