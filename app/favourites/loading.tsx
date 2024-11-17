"use client";

import CardsLoader from "@/components/global/CardsLoader";
import SectionTitle from "@/components/global/SectionTitle";

function loading() {
  return (
    <main>
      <SectionTitle title="your favourites" />
      <section className="mt-8">
        <CardsLoader />
      </section>
    </main>
  );
}
export default loading;
