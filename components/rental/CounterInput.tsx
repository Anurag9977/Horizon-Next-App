"use client";

import { useState } from "react";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

type CounterInputProps = {
  name: "guests" | "beds" | "bedrooms" | "baths";
  label?: string;
  form: UseFormReturn<any>;
  defaultValue?: number;
};

function CounterInput({
  name,
  label,
  form,
  defaultValue = 1,
}: CounterInputProps) {
  const [value, setValue] = useState(defaultValue);
  form.setValue(name, value);

  return (
    <Card className="bg-background rounded-md">
      <Input type="hidden" {...form.register(name)} />
      <div className="flex justify-between items-center py-6 px-8">
        <section className="flex flex-col gap-y-1">
          <CardTitle className="capitalize tracking-wide">
            {label || name}
          </CardTitle>
          <CardDescription className="text-sm">
            Set the maximum number of {label || name} allowed
          </CardDescription>
        </section>
        <section className="flex items-center gap-x-6">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="text-primary"
            onClick={() => {
              if (value === 1) return;
              setValue((prev) => {
                form.setValue(name, prev - 1);
                return prev - 1;
              });
            }}
          >
            <Minus />
          </Button>
          <h1 className="font-bold text-lg md:text-xl w-5 text-center tracking-wider">
            {value}
          </h1>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="text-primary"
            onClick={() => {
              if (value === 20) return;
              setValue((prev) => {
                form.setValue(name, prev + 1);
                return prev + 1;
              });
            }}
          >
            <Plus />
          </Button>
        </section>
      </div>
    </Card>
  );
}
export default CounterInput;
