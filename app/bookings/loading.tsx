"use client";

import TableLoader from "@/components/booking/TableLoader";
import SectionTitle from "@/components/global/SectionTitle";

function loading() {
  return (
    <main>
      <SectionTitle title="your bookings" />
      <section className="mt-8">
        <TableLoader />
      </section>
    </main>
  );
}
export default loading;
