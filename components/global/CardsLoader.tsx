import { Skeleton } from "../ui/skeleton";

function CardsLoader() {
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
      <LoadingContent />
      <LoadingContent />
      <LoadingContent />
      <LoadingContent />
    </section>
  );
}

function LoadingContent() {
  return (
    <div>
      <Skeleton className="h-72 w-full" />
      <Skeleton className="h-4 w-full mt-2" />
      <Skeleton className="h-4 w-3/4 my-2" />
      <Skeleton className="h-4 w-3/5" />
    </div>
  );
}
export default CardsLoader;
