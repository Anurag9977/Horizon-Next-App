import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { chillax } from "@/utils/fonts";

function SectionTitle({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div>
      <h1
        className={cn(
          `${chillax.className} capitalize tracking-wider text-xl font-semibold`,
          className
        )}
      >
        {title}
      </h1>
      <Separator className="mt-2" />
    </div>
  );
}
export default SectionTitle;
