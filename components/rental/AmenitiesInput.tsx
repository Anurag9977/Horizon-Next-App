"use client";

import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { UseFormReturn } from "react-hook-form";
import { amenities, type Amenity } from "@/utils/amenities";

function AmenitiesInput({
  form,
  defaultValue,
}: {
  form: UseFormReturn<any>;
  defaultValue?: string;
}) {
  let defaultAmenities: Amenity[] = [];

  if (defaultValue) {
    const defaultAmenitiesList: string[] = JSON.parse(defaultValue);
    defaultAmenities = amenities.map((amenity) => {
      if (defaultAmenitiesList.some((item) => item === amenity.label)) {
        amenity.selected = true;
        return amenity;
      }
      return amenity;
    });
  } else {
    defaultAmenities = amenities.map((amenity) => {
      amenity.selected = false; // Issue with amenities list in utils for some reason ??
      return amenity;
    });
  }

  const [amenitiesList, setAmenitiesList] =
    useState<Amenity[]>(defaultAmenities);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    defaultValue ? JSON.parse(defaultValue) : []
  );
  form.setValue("amenities", JSON.stringify(selectedAmenities));

  function handleChange(amenity: Amenity) {
    setAmenitiesList((prev) => {
      const current = prev.map((item) => {
        if (item.label === amenity.label) {
          return { ...item, selected: !item.selected };
        }
        return item;
      });
      let tempList: string[] = [];
      current.map((item) => {
        if (item.selected) {
          tempList.push(item.label);
        }
      });
      setSelectedAmenities([...tempList]);
      return current;
    });
  }

  return (
    <section>
      <Input type="hidden" {...form.register("amenities")} />
      <div className="grid grid-cols-2 gap-y-4 items-center">
        {amenitiesList.map((amenity, index) => {
          return (
            <div key={index} className="flex items-center gap-x-4">
              <Checkbox
                id={amenity.label}
                checked={amenity.selected}
                onCheckedChange={() => handleChange(amenity)}
              />
              <Label
                htmlFor={amenity.label}
                className="flex items-center gap-x-2"
              >
                <amenity.icon strokeWidth={1.4} className="h-5 w-5" />
                <span className="capitalize">{amenity.label}</span>
              </Label>
            </div>
          );
        })}
      </div>
    </section>
  );
}
export default AmenitiesInput;
