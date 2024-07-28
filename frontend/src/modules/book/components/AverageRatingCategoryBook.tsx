import useBooksStats from '../hooks/useBooksStats';
import { RadarChartCard } from '@/modules/common/components/RadarChartCard';

type AverageRatingCategoryBookProps = {
    id: number;
}

export default function AverageRatingCategoryBook({ id }: AverageRatingCategoryBookProps) {
  const { booksStats } = useBooksStats();
  const stats = booksStats?.bookStats.find(item => item.bookId == id);   
  
  if (!stats) return <div>no stats</div>

  return (
    <RadarChartCard
      data={[
        { category: "setting", rating: stats.setting },
        { category: "plot", rating: stats.plot },
        { category: "engagement", rating: stats.engagement },
        { category: "characters", rating: stats.characters  },
        { category: "style", rating: stats.style  },
      ]}
      labelKey="category"
      valueKey="rating"
      title="Durchschnittliche Bewertung der Kategorien"
      description={`Anzahl an Bewertungen: ${stats.ratingCount}`}
    />
  )
}