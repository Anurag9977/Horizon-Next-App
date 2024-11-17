import { fetchBookingChartData } from "@/utils/actions";
import Chart from "./Chart";

async function ChartsContainer() {
  const chartData = await fetchBookingChartData();
  if (chartData.length === 0) return null;

  return <Chart chartData={chartData} />;
}
export default ChartsContainer;
