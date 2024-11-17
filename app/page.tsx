import CardsLoader from "@/components/global/CardsLoader";
import CategoriesList from "@/components/home/CategoriesList";
import PropertiesContainer from "@/components/home/PropertiesContainer";
import { Suspense } from "react";
async function page({
  searchParams: { search, category },
}: {
  searchParams: { search?: string; category?: string };
}) {
  return (
    <main>
      <CategoriesList search={search} category={category} />
      <section className="mt-8 lg:mt-16">
        <Suspense fallback={<CardsLoader />}>
          <PropertiesContainer search={search} category={category} />
        </Suspense>
      </section>
    </main>
  );
}
export default page;
