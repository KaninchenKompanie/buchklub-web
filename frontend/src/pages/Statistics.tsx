import ExtremaBooksStats from "@/modules/book/components/ExtremaBooksStats";
import GenreDistribution from "@/modules/book/components/GenreDistribution";
import RecommendationDistribution from "@/modules/book/components/RecommendationDistribution";
import useBooksStats from "@/modules/book/hooks/useBooksStats";

export default function Statistics() {
  const { booksStats, isLoading, isError } = useBooksStats();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed...</div>;

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* <AverageRatingCategory data={chartData} /> */}
      <ExtremaBooksStats booksStats={booksStats!} />
      <div className="flex gap-4">
        <GenreDistribution />
        <RecommendationDistribution />
      </div>
    </div>
  );
}
