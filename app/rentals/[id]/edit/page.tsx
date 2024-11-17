import SectionTitle from "@/components/global/SectionTitle";
import EditRental from "@/components/rental/EditRental";
import { fetchPropertyDetails } from "@/utils/actions";
import { UpdatePropertyType } from "@/utils/schemas";

async function EditRentalPage({ params }: { params: { id: string } }) {
  const {
    name,
    tagline,
    description,
    category,
    country,
    price,
    guests,
    bedrooms,
    beds,
    baths,
    amenities,
    propertyImage,
  } = await fetchPropertyDetails({ propertyID: params.id });

  const propertyDetails: UpdatePropertyType = {
    name,
    tagline,
    description,
    category,
    country,
    price,
    guests,
    bedrooms,
    beds,
    baths,
    amenities,
  };
  return (
    <main>
      <SectionTitle title="edit rental" />
      <section className="mt-8">
        <EditRental
          propertyID={params.id}
          rentalDetails={propertyDetails}
          rentalImage={propertyImage}
        />
      </section>
    </main>
  );
}
export default EditRentalPage;
