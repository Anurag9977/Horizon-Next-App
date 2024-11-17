import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

type TextAreaInputProps = {
  name: string;
  label?: string;
  rows: number;
  control: Control<any>;
};
function TextAreaInput({ name, label, rows, control }: TextAreaInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="tracking-wide capitalize font-semibold">
            {label || name}
          </FormLabel>
          <FormControl>
            <Textarea
              {...field}
              rows={rows}
              className="leading-relaxed text-justify"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
export default TextAreaInput;
