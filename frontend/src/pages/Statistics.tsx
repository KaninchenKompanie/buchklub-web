import GenreDistribution from "@/modules/book/components/GenreDistribution";
import RecommendationDistribution from "@/modules/book/components/RecommendationDistribution";



export default function Statistics() {
  return (
    <div className="p-4 flex gap-4">
      <GenreDistribution />
      <RecommendationDistribution />
    </div>
  )
}
