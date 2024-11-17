import ReactCountryFlag from "react-country-flag";

import { cn } from "@/lib/utils";

function CountryAndFlag({
  countryCode,
  countryName,
  subString = true,
  className,
}: {
  countryCode: string;
  countryName: string;
  subString?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-x-[6px]", className)}>
      <ReactCountryFlag countryCode={countryCode} svg />
      <span>
        {subString
          ? countryName.length > 20
            ? countryName.substring(0, 30) + "..."
            : countryName
          : countryName}
      </span>
    </div>
  );
}
export default CountryAndFlag;
