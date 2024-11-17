import { Skeleton } from "../ui/skeleton";

function ReviewsLoader() {
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
      <LoadingContent />
      <LoadingContent />
      <LoadingContent />
    </section>
  );
}

function LoadingContent() {
  return (
    <div className="relative border rounded-lg px-6 py-4">
      <div className="flex items-center gap-x-2">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div>
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-20 h-3 mt-2" />
        </div>
      </div>
      <Skeleton className="my-4 w-1/2 h-4" />
      <Skeleton className="w-full h-20" />
      <div className="absolute top-4 right-4 flex flex-wrap items-center gap-x-4">
        <Skeleton className="w-5 h-5 rounded-md" />
        <Skeleton className="w-5 h-5 rounded-md" />
      </div>
    </div>
  );
}

export default ReviewsLoader;
