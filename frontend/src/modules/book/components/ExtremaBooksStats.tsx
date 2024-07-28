import { RadarChartCard } from "@/modules/common/components/RadarChartCard";
import {
  BookRatingBasic,
  BookRatingExtended,
  BooksStats,
} from "../configurations/types";

type ExtremaBooksStatsProps = {
  booksStats: BooksStats;
};

export default function ExtremaBooksStats({
  booksStats,
}: ExtremaBooksStatsProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <RadarChartCard
        className="flex-1"
        title="Most liked book"
        data={getChartData<BookRatingExtended>(
          booksStats.mostLikedBook.bayesianAverages
        )}
        labelKey={"label"}
        valueKey={"value"}
        description={"base average"}
        footer={booksStats.mostLikedBook.book}
      />
      <RadarChartCard
        className="flex-1"
        title="Less liked book"
        data={getChartData<BookRatingExtended>(
          booksStats.lessLikedBook.bayesianAverages
        )}
        labelKey={"label"}
        valueKey={"value"}
        description={"base average"}
        footer={booksStats.lessLikedBook.book}
      />
      <RadarChartCard
        className="flex-1"
        title="Most controversial book"
        data={getChartData<BookRatingBasic>(
          booksStats.mostControversialBook.standardDeviation
        )}
        labelKey={"label"}
        valueKey={"value"}
        description={"standard deviation"}
        footer={booksStats.mostControversialBook.book}
      />
    </div>
  );
}

function getChartData<T extends { [key: string]: number }>(
  bookRatingExtended: T
): {
  label: string;
  value: number;
}[] {
  return Object.keys(bookRatingExtended).map((key) => ({
    label: key,
    value: bookRatingExtended[key as keyof T],
  }));
}
