import { Control } from "react-hook-form";
import SelectInput from "../form/SelectInput";
import { SelectItem } from "../ui/select";
import { categories } from "@/utils/categories";

function CategoriesInput({ control }: { control: Control<any> }) {
  return (
    <SelectInput
      name="category"
      placeholder="select the type of rental"
      control={control}
    >
      {categories.map((item, index) => {
        return (
          <SelectItem key={index} value={item.label} className="cursor-pointer">
            <div className="flex flex-row items-center gap-x-2">
              <item.icon className="h-5 w-5" />
              <span className="capitalize">{item.label}</span>
            </div>
          </SelectItem>
        );
      })}
    </SelectInput>
  );
}
export default CategoriesInput;
