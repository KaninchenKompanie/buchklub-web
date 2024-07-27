"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { category: "Setting", rating: 7, fill: "hsl(var(--chart-1))" },
  { category: "Plot", rating: 3, fill: "hsl(var(--chart-2))" },
  { category: "Engagement", rating: 4, fill: "hsl(var(--chart-3))" },
  { category: "Characters", rating: 4, fill: "hsl(var(--chart-4))" },
  { category: "Story", rating: 5, fill: "hsl(var(--chart-5))" },
]

const chartConfig = {
  setting: {
    label: "Setting",
    color: "hsl(var(--chart-1))"
  },
  plot: {
    label: "Plot",
    color: "hsl(var(--chart-2))"
  },
  engagement: {
    label: "Engagement",
    color: "#14b8a6"
  },
  characters: {
    label: "Characters",
    color: "#14b8a6"
  },
  story: {
    label: "Story",
    color: "#14b8a6"
  }
} satisfies ChartConfig

export default function Statistics() {
  return (
    <Card className="w-5/12">
      <CardHeader>
        <CardTitle>Bewertung pro Kategory</CardTitle>
        <CardDescription>XX ANZAHL BÜCHER XX</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={true}
              tickMargin={20}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />11111
            <YAxis />
            <Bar dataKey="rating" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
