import { useEffect, useState } from "react";
import PieChartCard from "../../common/components/PieChartCard";

export default function GenreDistribution() {
  const [data, setData] = useState<{ genre: string; value: number }[]>([]);
  const [numberOfBooks, setNumberOfBooks] = useState(0);

  useEffect(() => {
    // TODO: convert to API call
    setNumberOfBooks(42);
    setData([
      { genre: "fantasy", value: 20 },
      { genre: "classic", value: 30 },
      { genre: "thriller", value: 15 },
      { genre: "romance", value: 20 },
      { genre: "porn", value: 15 },
    ]);
  }, []);

  return (
    <PieChartCard
      data={data}
      valueKey="value"
      labelKey="genre"
      title={"Genre Verteilung"}
      description={`${numberOfBooks} Bücher`}
      className="w-1/2"
    />
  );
}
