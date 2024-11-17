"use client";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { LuStar } from "react-icons/lu";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type RatingInputProps = {
  name: string;
  label?: string;
  form: UseFormReturn<any>;
};

function RatingInput({ name, label, form }: RatingInputProps) {
  const ratingValues = [1, 2, 3, 4, 5];

  const [rating, setRating] = useState(form.getValues().rating || 0);
  const [hover, setHover] = useState(0);

  return (
    <div>
      <Label className="capitalize tracking-wide font-semibold">
        {label || name}
      </Label>
      <Input type="hidden" {...form.register(name)} />
      <div className="mt-1 flex gap-x-[2px]">
        {ratingValues.map((value, index) => {
          return (
            <button
              key={index}
              type="button"
              onClick={() => {
                setRating(value);
                form.setValue(name, value);
              }}
              onMouseEnter={() => {
                setHover(value);
              }}
              onMouseLeave={() => setHover(rating)}
            >
              <LuStar
                className={`w-5 h-5 stroke-primary
                ${
                  value <= rating
                    ? "fill-primary"
                    : value <= hover
                    ? "fill-primary"
                    : ""
                }
              `}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
export default RatingInput;
