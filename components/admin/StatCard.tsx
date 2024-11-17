import { chillax } from "@/utils/fonts";
import { IconType } from "react-icons";

type StatCardProps = {
  title: string;
  count: string | number;
  Icon: IconType;
};

function StatCard({ title, count, Icon }: StatCardProps) {
  return (
    <div className="w-full bg-muted border rounded-lg px-6 py-4 flex justify-between items-center">
      <div className="flex flex-col gap-y-1">
        <h1
          className={`${chillax.className} text-3xl lg:text-4xl font-semibold tracking-wide`}
        >
          {count}
        </h1>
        <h2 className="capitalize tracking-wide text-sm lg:text-base">
          {title}
        </h2>
      </div>
      <Icon className="w-12 h-12 p-3 lg:w-16 lg:h-16 lg:p-4 text-primary bg-background rounded-full" />
    </div>
  );
}
export default StatCard;
