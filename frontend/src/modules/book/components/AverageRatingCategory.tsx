import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"

type Props = {
    data: {category: string; rating: number}[]
}

export default function AverageRatingCategory(props: Props) {
  return (
    <Card className="w-5/12">
      <CardHeader>
        <CardTitle>Bewertung pro Kategory</CardTitle>
        <CardDescription>XX ANZAHL BÜCHER XX</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}}>
          <BarChart accessibilityLayer data={props.data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={true}
              tickMargin={20}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <YAxis />
            <ChartTooltip labelClassName="text-slate-800 font-bold " wrapperClassName="rounded-lg"/>
            <Bar dataKey="rating" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}