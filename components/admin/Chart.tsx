"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import SectionTitle from "../property/SectionTitle";
import TrendInfo from "./TrendInfo";

type ChartProps = {
  month: string;
  bookings: number;
}[];

const chartConfig = {
  bookings: {
    label: "Bookings",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

function Chart({ chartData }: { chartData: ChartProps }) {
  return (
    <section>
      <SectionTitle heading="Monthly Bookings" subHeading="Last 6 months" />
      <ChartContainer config={chartConfig} className="mt-8 h-80 w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            fontSize={14}
            axisLine={false}
          />
          <YAxis
            height={50}
            scale="auto"
            tickLine={false}
            axisLine={false}
            fontSize={14}
            tickMargin={10}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar
            dataKey="bookings"
            fill="var(--color-bookings)"
            fillOpacity={0.4}
            stroke="var(--color-bookings)"
            radius={8}
          >
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={14}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
      <div className="mt-4">
        <TrendInfo chartData={chartData} />
        <h2 className="text-sm text-muted-foreground italic">
          Showing total bookings in the last six months.
        </h2>
      </div>
    </section>
  );
}
export default Chart;
