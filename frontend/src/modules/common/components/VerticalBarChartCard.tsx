import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

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

type VerticalBarChartCardProps = {
  data: any[];
  valueKey: string;
  labelKey: string;
  title: string;
  description: string;
} & ComponentProps<typeof Card>;

export default function VerticalBarChartCard({
  data,
  valueKey,
  labelKey,
  title,
  description,
  ...props
}: VerticalBarChartCardProps) {
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
          <BarChart accessibilityLayer data={chartData} layout="vertical">
            <CartesianGrid vertical={false} />
            <XAxis
              type="number"
              tickLine={true}
              tickMargin={20}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <YAxis
              axisLine={false}
              display="none"
              tickLine={false}
              textAnchor="start"
              dataKey={labelKey}
              hide
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              labelClassName="text-slate-800 font-bold "
              wrapperClassName="rounded-lg"
            />
            <Bar dataKey={valueKey} radius={8} barSize={20}>
              <LabelList
                dataKey={labelKey}
                position="insideLeft"
                color="black"
                style={{
                  fill: "rgba(0, 0, 0, 0.77)",
                }}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
