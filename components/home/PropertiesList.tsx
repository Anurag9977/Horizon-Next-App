import { PropertyCardType } from "@/utils/types";
import PropertyCard from "./PropertyCard";

function PropertiesList({ properties }: { properties: PropertyCardType[] }) {
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
      {properties.map((property) => {
        return <PropertyCard key={property.id} property={property} />;
      })}
    </section>
  );
}
export default PropertiesList;
