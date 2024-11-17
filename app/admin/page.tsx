import ChartLoader from "@/components/admin/ChartLoader";
import ChartsContainer from "@/components/admin/ChartsContainer";
import StatsContainer from "@/components/admin/StatsContainer";
import StatsLoader from "@/components/admin/StatsLoader";
import { Suspense } from "react";
function AdminPage() {
  return (
    <main>
      <Suspense fallback={<StatsLoader />}>
        <StatsContainer />
      </Suspense>
      <section className="mt-16">
        <Suspense fallback={<ChartLoader />}>
          <ChartsContainer />
        </Suspense>
      </section>
    </main>
  );
}
export default AdminPage;
