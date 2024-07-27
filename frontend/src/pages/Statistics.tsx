import AverageRatingCategory from "@/modules/book/components/AverageRatingCategory";
import GenreDistribution from "@/modules/book/components/GenreDistribution";
import RecommendationDistribution from "@/modules/book/components/RecommendationDistribution";

const chartData = [
  { category: "Setting", rating: 7 },
  { category: "Plot", rating: 3 },
  { category: "Engagement", rating: 4 },
  { category: "Characters", rating: 4 },
  { category: "Story", rating: 5 },
]


export default function Statistics() {
  return (
    <div className="p-4 flex gap-4">
      <AverageRatingCategory data={chartData} />
      <GenreDistribution />
      <RecommendationDistribution />
    </div>
  )
}
