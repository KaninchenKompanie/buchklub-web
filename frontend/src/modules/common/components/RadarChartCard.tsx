import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ComponentProps } from "react";
import { chartColors } from "../configurations/constants";
import { cn } from "@/lib/utils";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

type RadarChartCardProps = {
  data: any[];
  labelKey: string;
  valueKey: string;
  title: string;
  description: string;
} & ComponentProps<typeof Card>;

export function RadarChartCard({
  data,
  labelKey,
  valueKey,
  title,
  description,
  className,
  ...props
}: RadarChartCardProps) {
  const chartData = data.map((d, index) => ({
    ...d,
    fill: chartColors[index % chartColors.length],
  }));

  return (
    <Card className={cn("min-w-96", className)} {...props}>
      <CardHeader className="items-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey={labelKey} />
            <PolarGrid />
            <Radar
              dataKey={valueKey}
              fill="var(--color-desktop)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
