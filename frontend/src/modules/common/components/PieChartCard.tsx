import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
} from "@/components/ui/chart";
import { ComponentProps } from "react";
import { Cell, Pie, PieChart } from "recharts";
import { chartColors } from "../configurations/constants";

type PieChartCardProps = {
  data: any[];
  valueKey: string;
  labelKey: string;
  title: string;
  description: string;
} & ComponentProps<typeof Card>;

export default function PieChartCard({
  data,
  valueKey,
  labelKey,
  title,
  description,
  ...props
}: PieChartCardProps) {
  const chartData = data.map((d, index) => ({
    ...d,
    fill: chartColors[index % chartColors.length]
  }))
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{}}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie
              startAngle={-270}
              data={chartData}
              dataKey={valueKey}
              nameKey={labelKey}
            />
            <ChartLegend
              
            />
            <ChartTooltip
              formatter={(value) => `${value}%`}
              labelClassName="text-slate-800 font-bold "
              wrapperClassName="rounded-lg"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
