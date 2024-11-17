import { fetchAllProperties } from "@/utils/actions";
import PropertiesList from "./PropertiesList";
import EmptyList from "../global/EmptyList";

async function PropertiesContainer({
  search,
  category,
}: {
  search?: string;
  category?: string;
}) {
  const properties = await fetchAllProperties({ search, category });
  return (
    <section>
      {properties.length === 0 ? (
        <EmptyList
          heading="No properties found for this search."
          message="Please update the filters and check."
          buttonText="clear filters"
        />
      ) : (
        <PropertiesList properties={properties} />
      )}
    </section>
  );
}
export default PropertiesContainer;
