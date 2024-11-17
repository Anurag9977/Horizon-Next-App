import { Control } from "react-hook-form";
import { Input } from "../ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { HTMLInputTypeAttribute } from "react";

type FormInputProps = {
  name: string;
  label?: string;
  type: HTMLInputTypeAttribute;
  control: Control<any>;
};

function FormInput({ name, label, type, control }: FormInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className="tracking-wide capitalize font-semibold">
              {label || name}
            </FormLabel>
            <FormControl>
              <Input {...field} type={type} min={1} />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
export default FormInput;
