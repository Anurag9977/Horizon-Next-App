import { getCountryByCode } from "@/utils/countries";
import { formatPrice } from "@/utils/format";
import { PropertyCardType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import FavouriteButton from "../favourite/FavouriteButton";
import PropertyRating from "../review/PropertyRating";
import CountryAndFlag from "../property/CountryAndFlag";

function PropertyCard({ property }: { property: PropertyCardType }) {
  const { id, name, tagline, price, propertyImage, country } = property;
  const { name: countryName, code } = getCountryByCode(country);
  return (
    <article key={id} className="relative">
      <Link href={`/properties/${id}`}>
        <div className="relative h-72 overflow-hidden rounded-lg">
          <Image
            src={propertyImage}
            alt={name}
            priority
            fill
            sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw 33vw"
            className="w-full h-full object-cover rounded-lg hover:scale-105 duration-300"
          />
        </div>
        <div className="mt-2">
          <div className="flex justify-between items-center">
            <h1>{name.length > 30 ? name.substring(0, 30) + "..." : name}</h1>
            <PropertyRating propertyID={id} />
          </div>
          <h2 className="text-muted-foreground">
            {tagline.length > 30 ? tagline.substring(0, 30) + "..." : tagline}
          </h2>
          <div className="mt-1 flex flex-wrap justify-between">
            <span>{formatPrice(price)} night</span>
            <CountryAndFlag countryCode={code} countryName={countryName} />
          </div>
        </div>
      </Link>
      <div className="absolute top-3 right-3">
        <FavouriteButton propertyID={id} isPropertyPage={false} />
      </div>
    </article>
  );
}
export default PropertyCard;
