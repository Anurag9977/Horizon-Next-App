import EmptyList from "@/components/global/EmptyList";
import SectionTitle from "@/components/global/SectionTitle";
import PropertiesList from "@/components/home/PropertiesList";
import { fetchFavouriteProperties } from "@/utils/actions";

async function FavouritesPage() {
  const favouriteProperties = await fetchFavouriteProperties();
  if (favouriteProperties.length === 0) {
    return (
      <EmptyList
        heading="You do not have any favourites currently."
        message="Please mark a few properties as favourites."
        buttonText="return home"
      />
    );
  }

  return (
    <main>
      <SectionTitle title="your favourites" />
      <section className="mt-8">
        <PropertiesList properties={favouriteProperties} />
      </section>
    </main>
  );
}
export default FavouritesPage;
