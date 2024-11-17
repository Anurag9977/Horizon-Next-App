import { Skeleton } from "../ui/skeleton";

function ChartLoader() {
  return (
    <section className="mt-16">
      <Skeleton className="h-4 w-64 rounded-lg" />
      <Skeleton className="mt-2 h-4 w-32 rounded-lg" />
      <Skeleton className="mt-8 h-80 rounded-lg" />
    </section>
  );
}
export default ChartLoader;
