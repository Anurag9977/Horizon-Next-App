import { LuTrendingDown, LuTrendingUp } from "react-icons/lu";

type TrendInfoProps = {
  month: string;
  bookings: number;
}[];

function TrendInfo({ chartData }: { chartData: TrendInfoProps }) {
  const chartDataSize = chartData.length;
  if (chartDataSize < 2) return null;

  const bookingsInCurrentMonth = chartData[chartDataSize - 1].bookings;
  const bookingsInLastMonth = chartData[chartDataSize - 2].bookings;
  const trend = bookingsInCurrentMonth - bookingsInLastMonth;
  const trendPercentage = new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 1,
  }).format(Math.abs(trend) / bookingsInLastMonth);

  if (trend === 0) return null;

  return (
    <div className="tracking-wide font-semibold text-sm flex items-center gap-x-1">
      Trending {trend > 0 ? "up" : "down"} by {trendPercentage} this month
      {trend > 0 ? (
        <LuTrendingUp strokeWidth={2.5} className="w-4 h-4" />
      ) : (
        <LuTrendingDown strokeWidth={2.5} className="w-4 h-4" />
      )}
    </div>
  );
}
export default TrendInfo;
