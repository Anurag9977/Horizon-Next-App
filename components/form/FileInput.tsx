import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type FileInputProps = {
  name: string;
  label?: string;
  control: Control<any>;
};

function FileInput({ name, label, control }: FileInputProps) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className="tracking-wide capitalize font-semibold">
              {label || name}
            </FormLabel>
            <FormControl>
              <Input
                type="file"
                onChange={(e) => {
                  field.onChange(e.target?.files?.[0] ?? undefined);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
export default FileInput;
