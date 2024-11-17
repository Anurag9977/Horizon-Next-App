import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

function PropertyLoader() {
  return (
    <section>
      <main>
        <Skeleton className="w-60 h-4" />
        <section className="mt-8 flex flex-wrap justify-between items-center gap-y-2">
          <Skeleton className="w-1/2 h-8" />
          <Skeleton className="w-20 h-8" />
        </section>
        <section className="mt-8 grid lg:grid-cols-[3fr_2fr] gap-y-8 gap-x-8 xl:gap-x-12">
          <Skeleton className="h-96 w-full" />
          <div>
            <Skeleton className="w-3/4 h-6" />
            <Skeleton className="my-2 w-1/2 h-4" />
            <Skeleton className="w-1/4 h-4" />
            <Separator className="my-8 lg:my-6" />
            <div className="grid grid-cols-[auto_1fr] items-center gap-x-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="w-full flex flex-col gap-y-2">
                <Skeleton className="w-2/5 h-5" />
                <Skeleton className="w-1/2 h-4" />
              </div>
            </div>
            <Separator className="my-8 lg:my-6" />
            <Skeleton className="w-full h-[calc(384px-218px)]" />
          </div>
        </section>
      </main>
    </section>
  );
}
export default PropertyLoader;
