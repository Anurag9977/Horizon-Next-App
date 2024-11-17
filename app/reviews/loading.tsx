"use client";

import SectionTitle from "@/components/global/SectionTitle";
import ReviewsLoader from "@/components/review/ReviewsLoader";

function loading() {
  return (
    <main>
      <SectionTitle title="your reviews" />
      <section className="mt-8">
        <ReviewsLoader />
      </section>
    </main>
  );
}
export default loading;
