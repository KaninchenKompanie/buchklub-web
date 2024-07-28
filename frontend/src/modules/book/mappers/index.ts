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
    bestSingleBook: {
      book: bookStatsDto.single_best_book.book,
      percentiles: {
        medianPercentile:
          bookStatsDto.single_best_book.percentiles.median_percentile,
        setting: bookStatsDto.single_best_book.percentiles.setting,
        plot: bookStatsDto.single_best_book.percentiles.plot,
        engagement: bookStatsDto.single_best_book.percentiles.engagement,
        characters: bookStatsDto.single_best_book.percentiles.characters,
        style: bookStatsDto.single_best_book.percentiles.style,
      },
    },
    worstBook: {
      book: bookStatsDto.worst_book.book,
      percentiles: {
        medianPercentile: bookStatsDto.worst_book.percentiles.median_percentile,
        setting: bookStatsDto.worst_book.percentiles.setting,
        plot: bookStatsDto.worst_book.percentiles.plot,
        engagement: bookStatsDto.worst_book.percentiles.engagement,
        characters: bookStatsDto.worst_book.percentiles.characters,
        style: bookStatsDto.worst_book.percentiles.style,
      },
    },
    mostControversialBook: {
      book: bookStatsDto.most_controversial_book.book,
      percentiles: {
        medianPercentile:
          bookStatsDto.most_controversial_book.percentiles.median_percentile,
        setting: bookStatsDto.most_controversial_book.percentiles.setting,
        plot: bookStatsDto.most_controversial_book.percentiles.plot,
        engagement: bookStatsDto.most_controversial_book.percentiles.engagement,
        characters: bookStatsDto.most_controversial_book.percentiles.characters,
        style: bookStatsDto.most_controversial_book.percentiles.style,
      },
    },
  };
}

function mapBookBayesianSettingDtoToBookBayesianSetting(
  bookBayesianSettingDto: BookBayesianSettingDto
): BookBayesianSetting {
  return {
    book: bookBayesianSettingDto.Book,
    bayesianSetting: bookBayesianSettingDto.Bayesian_plot,
    userCount: bookBayesianSettingDto["User Count"],
  };
}
