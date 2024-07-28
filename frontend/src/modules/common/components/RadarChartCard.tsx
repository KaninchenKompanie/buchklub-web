import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  footer?: string;
  scale?: number[]
} & ComponentProps<typeof Card>;

export function RadarChartCard({
  data,
  labelKey,
  valueKey,
  title,
  description,
  footer,
  className,
  scale=[0,8],
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
            <PolarRadiusAxis angle={30} domain={scale} />
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
      {footer && (
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            {footer}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
