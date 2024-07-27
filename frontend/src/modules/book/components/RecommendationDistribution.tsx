import { useEffect, useState } from 'react';
import PieChartCard from '../../common/components/PieChartCard';

type Props = {}

export default function RecommendationDistribution({}: Props) {
    const [data, setData] = useState<{ recommended: string; value: number }[]>([]);
    const [numberOfBooks, setNumberOfBooks] = useState(42);

      useEffect(() => {
        // TODO: convert to API call
        setNumberOfBooks(42);
        setData([
          { recommended: "yes", value: 20 },
          { recommended: "no", value: 30 },
        ]);
      }, []);
    
  return (
    <PieChartCard
      data={data}
      valueKey="value"
      labelKey="recommended"
      title={"Bücher weiterempfohlen"}
      description={`${numberOfBooks} Bücher`}
      className="w-1/2"
    />
  )
}