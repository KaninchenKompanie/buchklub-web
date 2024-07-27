import HorizontalBarChartCard from "@/modules/common/components/HorizontalBarChartCard";

type Props = {
  data: { category: string; rating: number }[];
};

export default function AverageRatingCategory(props: Props) {
  return (
    <HorizontalBarChartCard
      data={props.data}
      valueKey={"rating"}
      labelKey={"category"}
      title={"Bewertung pro Kategory"}
      description={"XX ANZAHL BÜCHER XX"}
    />
  );
}
