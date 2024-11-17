import StatsLoader from "@/components/admin/StatsLoader";
import TableLoader from "@/components/booking/TableLoader";
import ReservationsContainer from "@/components/reservation/ReservationsContainer";
import ReservationStats from "@/components/reservation/ReservationStats";
import { Suspense } from "react";

function ReservationsPage() {
  return (
    <main>
      <Suspense fallback={<StatsLoader />}>
        <ReservationStats />
      </Suspense>
      <section className="mt-16">
        <Suspense fallback={<TableLoader />}>
          <ReservationsContainer />
        </Suspense>
      </section>
    </main>
  );
}
export default ReservationsPage;
