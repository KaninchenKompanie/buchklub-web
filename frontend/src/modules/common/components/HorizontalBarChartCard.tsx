import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { ComponentProps } from "react";
import { chartColors } from "../configurations/constants";

type HorizontalBarChartCardProps = {
  data: any[];
  valueKey: string;
  labelKey: string;
  title: string;
  description: string;
} & ComponentProps<typeof Card>;

export default function HorizontalBarChartCard({
  data,
  valueKey,
  labelKey,
  title,
  description,
  ...props
}: HorizontalBarChartCardProps) {
  const chartData = data.map((d, index) => ({
    ...d,
    fill: chartColors[index % chartColors.length],
  }));

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={labelKey}
              tickLine={true}
              tickMargin={20}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <YAxis />
            <ChartTooltip
              labelClassName="text-slate-800 font-bold "
              wrapperClassName="rounded-lg"
            />
            <Bar dataKey={valueKey} radius={8} barSize={15} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
