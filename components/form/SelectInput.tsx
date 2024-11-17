"use client";

import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type SelectInputProps = {
  name: string;
  label?: string;
  control: Control<any>;
  placeholder?: string;
  children: React.ReactNode;
};

function SelectInput({
  name,
  label,
  control,
  placeholder,
  children,
}: SelectInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="tracking-wide capitalize font-semibold">
            {label || name}
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="capitalize">
                <SelectValue placeholder={field.value || placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent position="item-aligned" className="bg-background">
              {children}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
export default SelectInput;
