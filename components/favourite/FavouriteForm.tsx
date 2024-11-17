"use client";

import { favouriteSchema, FavouriteType } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormContainer from "../form/FormContainer";
import { FavouriteSubmitButton } from "../form/Buttons";
import { usePathname } from "next/navigation";
import { toggleFavouriteProperty } from "@/utils/actions";
import { useOptimistic } from "react";

function FavouriteForm({
  favouriteID,
  propertyID,
  isPropertyPage,
}: {
  favouriteID: string | undefined;
  propertyID: string;
  isPropertyPage: boolean;
}) {
  const defaultValues: FavouriteType = {
    propertyID,
  };
  const form = useForm<z.infer<typeof favouriteSchema>>({
    resolver: zodResolver(favouriteSchema),
    defaultValues,
  });

  const pathName = usePathname();

  const toggleFavouriteWithID = toggleFavouriteProperty.bind(null, {
    favouriteID,
    pathName,
  });

  const isFavourite = favouriteID ? true : false;
  const [isOptimisticFavourite, setIsOptimisticFavourite] = useOptimistic(
    isFavourite,
    (state, newIsFavourite: boolean) => {
      return newIsFavourite;
    }
  );

  return (
    <FormContainer
      formSchema={favouriteSchema}
      form={form}
      action={async (formData: FormData) => {
        setIsOptimisticFavourite(!isFavourite);
        return await toggleFavouriteWithID(formData);
      }}
    >
      <FavouriteSubmitButton
        isFavourite={isOptimisticFavourite}
        isSubmitting={form.formState.isSubmitting}
        isIcon={isPropertyPage}
      />
    </FormContainer>
  );
}
export default FavouriteForm;
