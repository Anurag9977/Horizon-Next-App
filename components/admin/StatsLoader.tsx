import { Skeleton } from "../ui/skeleton";

function StatsLoader() {
  return (
    <section className="grid sm:grid-cols-3 gap-y-6 gap-x-4 lg:gap-x-8 sm:justify-between">
      <Skeleton className="h-32 rounded-lg" />
      <Skeleton className="h-32 rounded-lg" />
      <Skeleton className="h-32 rounded-lg" />
    </section>
  );
}
export default StatsLoader;
