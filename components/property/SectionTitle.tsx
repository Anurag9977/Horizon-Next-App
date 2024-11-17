import { cn } from "@/lib/utils";
import { chillax } from "@/utils/fonts";

function SectionTitle({
  heading,
  subHeading,
  className,
}: {
  heading: string;
  subHeading?: string;
  className?: string;
}) {
  return (
    <div>
      <h1
        className={cn(
          `${chillax.className} tracking-wide font-semibold text-lg lg:text-2xl`,
          className
        )}
      >
        {heading}
      </h1>
      {subHeading && (
        <p className="text-sm lg:text-base text-muted-foreground italic">
          {subHeading}
        </p>
      )}
    </div>
  );
}
export default SectionTitle;
