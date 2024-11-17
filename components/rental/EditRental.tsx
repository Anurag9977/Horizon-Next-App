"use client";

import { updatePropertySchema, UpdatePropertyType } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import FormContainer from "../form/FormContainer";
import { editRental } from "@/utils/actions";
import TextInput from "../form/FormInput";
import TextAreaInput from "../form/TextAreaInput";
import CategoriesInput from "./CategoriesInput";
import CountriesInput from "./CountriesInput";
import CounterInput from "./CounterInput";
import AmenitiesInput from "./AmenitiesInput";
import { SubmitButton } from "../form/Buttons";
import RentalImageContainer from "./RentalImageContainer";

function EditRental({
  propertyID,
  rentalDetails,
  rentalImage,
}: {
  propertyID: string;
  rentalDetails: UpdatePropertyType;
  rentalImage: string;
}) {
  const {
    name,
    tagline,
    description,
    category,
    country,
    price,
    guests,
    bedrooms,
    beds,
    baths,
    amenities,
  } = rentalDetails;

  const defaultValues = {
    name,
    tagline,
    description,
    category,
    country,
    price,
  };

  const form = useForm<z.infer<typeof updatePropertySchema>>({
    resolver: zodResolver(updatePropertySchema),
    defaultValues,
  });

  useEffect(() => {
    if (form.formState.errors.amenities) {
      toast({ description: form.formState.errors.amenities.message });
    }
  }, [form.formState.errors.amenities]);

  const editRentalWithPathName = editRental.bind(null, {
    propertyID,
  });

  return (
    <section className="px-8 py-6 border rounded-lg">
      <RentalImageContainer
        name={name}
        rentalImage={rentalImage}
        propertyID={propertyID}
      />
      <FormContainer
        formSchema={updatePropertySchema}
        form={form}
        action={editRentalWithPathName}
      >
        <h1 className="my-6 capitalize tracking-wide text-lg font-semibold">
          general information
        </h1>
        <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
          <TextInput
            name="name"
            label="property name"
            type="text"
            control={form.control}
          />
          <TextInput
            name="tagline"
            label="tagline"
            type="text"
            control={form.control}
          />
          <TextInput
            name="price"
            label="price/night(₹)"
            type="number"
            control={form.control}
          />
          <CategoriesInput control={form.control} />
        </div>
        <div className="my-4">
          <TextAreaInput name="description" rows={5} control={form.control} />
        </div>
        <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
          <CountriesInput control={form.control} />
        </div>
        <h1 className="my-6 capitalize tracking-wide text-lg font-semibold">
          accomodation details
        </h1>
        <div className="flex flex-col gap-y-4">
          <CounterInput name="guests" form={form} defaultValue={guests} />
          <CounterInput name="bedrooms" form={form} defaultValue={bedrooms} />
          <CounterInput name="beds" form={form} defaultValue={beds} />
          <CounterInput name="baths" form={form} defaultValue={baths} />
        </div>
        <h1 className="my-6 capitalize tracking-wide text-lg font-semibold">
          amenities
        </h1>
        <AmenitiesInput form={form} defaultValue={amenities} />
        <div className="mt-8 w-max self-end">
          <SubmitButton
            text="update rental"
            isSubmitting={form.formState.isSubmitting}
          />
        </div>
      </FormContainer>
    </section>
  );
}
export default EditRental;
