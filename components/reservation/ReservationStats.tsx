import { fetchReservationStats } from "@/utils/actions";
import StatCard from "../admin/StatCard";
import { LuIndianRupee, LuLayers, LuListChecks } from "react-icons/lu";
import { formatPrice } from "@/utils/format";

async function ReservationStats() {
  const reservationStats = await fetchReservationStats();
  return (
    <section className="grid sm:grid-cols-3 gap-y-6 gap-x-4 lg:gap-x-8 sm:justify-between">
      <StatCard
        title="rentals hosted"
        count={reservationStats.totalRentals}
        Icon={LuLayers}
      />
      <StatCard
        title="nights booked"
        count={reservationStats.totalNights}
        Icon={LuListChecks}
      />
      <StatCard
        title="income earned"
        count={formatPrice(reservationStats.totalEarnings)}
        Icon={LuIndianRupee}
      />
    </section>
  );
}
export default ReservationStats;
