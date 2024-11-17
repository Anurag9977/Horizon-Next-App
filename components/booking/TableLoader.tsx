import { Skeleton } from "../ui/skeleton";

function TableLoader() {
  return (
    <>
      <Skeleton className="w-full h-12" />
      <Skeleton className="my-2 w-full h-12" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="my-2 w-full h-12" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="my-2 w-full h-12" />
    </>
  );
}
export default TableLoader;
