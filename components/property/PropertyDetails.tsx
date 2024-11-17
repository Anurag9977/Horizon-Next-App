import { formatQuantity } from "@/utils/format";
import PropertyRating from "../review/PropertyRating";
import { Separator } from "../ui/separator";
import HostInfo from "./UserDetails";
import { PropertyDetailsProps } from "@/utils/types";
import Description from "./Description";

function PropertyDetails({
  id,
  name,
  category,
  description,
  guests,
  bedrooms,
  beds,
  baths,
  profile,
}: PropertyDetailsProps) {
  return (
    <div>
      <h2 className="capitalize tracking-wide font-semibold text-lg lg:text-2xl">
        {name}
      </h2>
      <p className="mt-1 mb-3 capitalize text-muted-foreground">
        {category} | {formatQuantity({ item: "Guest", value: guests })} &#183;{" "}
        {formatQuantity({ item: "Bedroom", value: bedrooms })} &#183;{" "}
        {formatQuantity({ item: "Bed", value: beds })} &#183;{" "}
        {formatQuantity({ item: "Bath", value: baths })}
      </p>
      <PropertyRating propertyID={id} size="lg" showReviews />
      <Separator className="lg:my-6 my-8" />
      <HostInfo profile={profile} />
      <Separator className="lg:my-6 my-8" />
      <Description description={description} />
    </div>
  );
}
export default PropertyDetails;
