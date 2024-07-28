import HorizontalBarChartCard from "@/modules/common/components/HorizontalBarChartCard";

type Props = {
  title: string;
  description: string;
  data: { category: string; rating: number }[];
};

export default function AverageRatingCategory({ title, description, data }: Props) {
  return (
    <HorizontalBarChartCard
      data={data}
      valueKey={"rating"}
      labelKey={"category"}
      title={title}
      description={description}
    />
  );
}
