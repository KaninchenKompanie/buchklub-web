import {
  BookBayesianSetting,
  BookBayesianSettingDto,
  BooksStats,
  BooksStatsDto,
} from "../configurations/types";

export function mapBooksStatsDtoToBookStats(
  bookStatsDto: BooksStatsDto
): BooksStats {
  return {
    bestBookPerCategory: {
      setting: mapBookBayesianSettingDtoToBookBayesianSetting(
        bookStatsDto.best_books_per_category.setting
      ),
      plot: mapBookBayesianSettingDtoToBookBayesianSetting(
        bookStatsDto.best_books_per_category.plot
      ),
      engagement: mapBookBayesianSettingDtoToBookBayesianSetting(
        bookStatsDto.best_books_per_category.engagement
      ),
      characters: mapBookBayesianSettingDtoToBookBayesianSetting(
        bookStatsDto.best_books_per_category.characters
      ),
      style: mapBookBayesianSettingDtoToBookBayesianSetting(
        bookStatsDto.best_books_per_category.style
      ),
    },
    mostLikedBook: {
      book: bookStatsDto.most_liked_book.book || "",
      bayesianAverages: {
        setting: bookStatsDto.most_liked_book.bayesian_averages.setting || 0,
        plot: bookStatsDto.most_liked_book.bayesian_averages.plot || 0,
        engagement:
          bookStatsDto.most_liked_book.bayesian_averages.engagement || 0,
        characters:
          bookStatsDto.most_liked_book.bayesian_averages.characters || 0,
        style: bookStatsDto.most_liked_book.bayesian_averages.style || 0,
        recommendPercentage:
          bookStatsDto.most_liked_book.bayesian_averages
            .recommended_percentage || 0,
        totalAverageRating:
          bookStatsDto.most_liked_book.bayesian_averages.total_average_rating ||
          0,
      },
    },
    lessLikedBook: {
      book: bookStatsDto.less_liked_book.book || "",
      bayesianAverages: {
        setting: bookStatsDto.less_liked_book.bayesian_averages.setting || 0,
        plot: bookStatsDto.less_liked_book.bayesian_averages.plot || 0,
        engagement:
          bookStatsDto.less_liked_book.bayesian_averages.engagement || 0,
        characters:
          bookStatsDto.less_liked_book.bayesian_averages.characters || 0,
        style: bookStatsDto.less_liked_book.bayesian_averages.style || 0,
        recommendPercentage:
          bookStatsDto.less_liked_book.bayesian_averages
            .recommended_percentage || 0,
        totalAverageRating:
          bookStatsDto.less_liked_book.bayesian_averages.total_average_rating ||
          0,
      },
    },
    mostControversialBook: {
      book: bookStatsDto.most_controversial_book.book || "",
      standardDeviation: {
        setting: bookStatsDto.less_liked_book.bayesian_averages.setting || 0,
        plot: bookStatsDto.less_liked_book.bayesian_averages.plot || 0,
        engagement:
          bookStatsDto.less_liked_book.bayesian_averages.engagement || 0,
        characters:
          bookStatsDto.less_liked_book.bayesian_averages.characters || 0,
        style: bookStatsDto.less_liked_book.bayesian_averages.style || 0,
      },
      recommendPercentage:
        bookStatsDto.most_controversial_book.recommend_percentage || 0,
    },
    bookStats: bookStatsDto.all_books_stats.map((bookStat) => ({
      setting: bookStat.setting || 0,
      plot: bookStat.plot || 0,
      engagement: bookStat.engagement || 0,
      characters: bookStat.characters || 0,
      style: bookStat.style || 0,
      recommendPercentage: bookStat.recommend_percentage || 0,
      totalAverageRating: bookStat.total_average_rating || 0,
      bookId: bookStat.book_id || "",
      bookName: bookStat.book_name || "",
      ratingCount: bookStat.rating_count || 0,
    })),
  };
}

function mapBookBayesianSettingDtoToBookBayesianSetting(
  bookBayesianSettingDto: BookBayesianSettingDto
): BookBayesianSetting {
  return {
    book: bookBayesianSettingDto.Book || "",
    bayesianAverage: bookBayesianSettingDto.Bayesian_average || 0,
    userCount: bookBayesianSettingDto["User Count"] || 0,
  };
}
