import { cn } from "@/lib/utils";

function MainContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn("mx-auto px-8 md:w-[95%] lg:w-[90%] xl:w-[85%]", className)}
    >
      {children}
    </main>
  );
}
export default MainContainer;
