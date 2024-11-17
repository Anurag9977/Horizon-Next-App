import { fetchAdminStats } from "@/utils/actions";
import { LuLayers, LuListChecks, LuUsers } from "react-icons/lu";
import StatCard from "./StatCard";

async function StatsContainer() {
  const adminStats = await fetchAdminStats();
  return (
    <section className="grid sm:grid-cols-3 gap-y-6 gap-x-4 lg:gap-x-8 sm:justify-between">
      <StatCard title="users" count={adminStats.totalUsers} Icon={LuUsers} />
      <StatCard
        title="properties"
        count={adminStats.totalProperties}
        Icon={LuListChecks}
      />
      <StatCard
        title="bookings"
        count={adminStats.totalBookings}
        Icon={LuLayers}
      />
    </section>
  );
}
export default StatsContainer;
