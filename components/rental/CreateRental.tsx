"use client";

import { propertySchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormContainer from "../form/FormContainer";
import { createRental } from "@/utils/actions";
import TextInput from "../form/FormInput";
import { SubmitButton } from "../form/Buttons";
import TextAreaInput from "../form/TextAreaInput";
import FileInput from "../form/FileInput";
import CountriesInput from "./CountriesInput";
import CategoriesInput from "./CategoriesInput";
import CounterInput from "./CounterInput";
import AmenitiesInput from "./AmenitiesInput";
import { useEffect } from "react";
import { toast } from "../ui/use-toast";

function CreateRental() {
  const defaultValues = {
    name: "Cabin in Indian Hill Station",
    tagline: "Dream Getaway Awaits You Here",
    price: 2500,
    description:
      "Glamping Tuscan Style in an Aframe Cabin Tent, nestled in a beautiful olive orchard. AC, heat, Queen Bed, TV, Wi-Fi and an amazing view. Close to Weeki Wachee River State Park, mermaids, manatees, Chassahwitzka River and on the SC Bike Path. Kayaks available for rivers. Bathhouse, fire pit, Kitchenette, fresh eggs. Relax & enjoy fresh country air. No pets please. Ducks, hens and roosters roam the grounds. We have a Pot Cake Rescue from Bimini, Retriever and Pom dog. The space is inspiring and relaxing. Enjoy the beauty of the orchard. Spring trees are in blossom and harvested in Fall. We have a farm store where we sell our farm to table products",
  };

  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues,
  });

  useEffect(() => {
    if (form.formState.errors.amenities) {
      toast({ description: form.formState.errors.amenities.message });
    }
  }, [form.formState.errors.amenities]);

  return (
    <FormContainer
      formSchema={propertySchema}
      form={form}
      action={createRental}
    >
      <div className="px-8 py-6 border rounded-lg">
        <h1 className="mb-6 capitalize tracking-wide text-lg font-semibold">
          general information
        </h1>
        <div className="grid md:grid-cols-2 gap-x-6 gap-y-4 ">
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
        <div className="grid md:grid-cols-2 gap-x-6 gap-y-4 ">
          <CountriesInput control={form.control} />
          <FileInput
            name="propertyImage"
            label="property image"
            control={form.control}
          />
        </div>
        <h1 className="my-6 capitalize tracking-wide text-lg font-semibold">
          accomodation details
        </h1>
        <div className="flex flex-col gap-y-4">
          <CounterInput name="guests" form={form} />
          <CounterInput name="bedrooms" form={form} />
          <CounterInput name="beds" form={form} />
          <CounterInput name="baths" form={form} />
        </div>
        <h1 className="my-6 capitalize tracking-wide text-lg font-semibold">
          amenities
        </h1>
        <AmenitiesInput form={form} />
        <div className="mt-8 w-max self-end">
          <SubmitButton
            text="create rental"
            isSubmitting={form.formState.isSubmitting}
          />
        </div>
      </div>
    </FormContainer>
  );
}
export default CreateRental;
