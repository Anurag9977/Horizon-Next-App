import { Control } from "react-hook-form";
import SelectInput from "../form/SelectInput";
import { formattedCountries } from "@/utils/countries";
import { SelectItem } from "../ui/select";
import ReactCountryFlag from "react-country-flag";

function CountriesInput({ control }: { control: Control<any> }) {
  return (
    <SelectInput name="country" placeholder="select country" control={control}>
      {formattedCountries.map((country) => {
        return (
          <SelectItem
            key={country.code}
            value={country.code}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-x-2">
              {/* <ReactCountryFlag countryCode={country.code} svg /> */}
              <span className="capitalize">{country.name}</span>
            </div>
          </SelectItem>
        );
      })}
    </SelectInput>
  );
}
export default CountriesInput;
