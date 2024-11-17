import { useForm } from "react-hook-form";
import FileInput from "../form/FileInput";
import { z } from "zod";
import { propertyImageSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import FormContainer from "../form/FormContainer";
import { updateRentalImage } from "@/utils/actions";
import { SubmitButton } from "../form/Buttons";

function UpdateRentalImage({
  propertyID,
  imageURL,
}: {
  propertyID: string;
  imageURL: string;
}) {
  const form = useForm<z.infer<typeof propertyImageSchema>>({
    resolver: zodResolver(propertyImageSchema),
  });

  const updateRentalImageWithPathName = updateRentalImage.bind(null, {
    propertyID,
    imageURL,
  });

  return (
    <FormContainer
      form={form}
      formSchema={propertyImageSchema}
      action={updateRentalImageWithPathName}
    >
      <FileInput
        name="propertyImage"
        label="select property image"
        control={form.control}
      />
      <div className="my-2">
        <SubmitButton
          text="update image"
          isSubmitting={form.formState.isSubmitting}
        />
      </div>
    </FormContainer>
  );
}
export default UpdateRentalImage;
