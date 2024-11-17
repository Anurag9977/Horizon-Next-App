import { getAmenityIcon } from "@/utils/amenities";
import { IconType } from "react-icons";
import SectionTitle from "./SectionTitle";

function Amenities({ amenities }: { amenities: string }) {
  const amenitiesList: string[] = JSON.parse(amenities);
  return (
    <section>
      <SectionTitle heading="What this place offers" />
      <div className="mt-4 grid grid-cols-2 gap-y-6 justify-between">
        {amenitiesList.map((amenity, index) => {
          const Icon: IconType = getAmenityIcon(amenity);
          return (
            <div key={index} className="flex items-center gap-x-2">
              <Icon
                strokeWidth={1.6}
                className="stroke-primary h-5 w-5 lg:h-7 lg:w-7"
              />
              <p className="capitalize text-sm lg:text-base">{amenity}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
export default Amenities;
