export type CreateBook = {
  name: string;
  author: string;
  year: number;
  genre: string[];
  description: string;
};

export type Book = CreateBook & {
  id: number;
  rating?: number;
};

export type BooksStats = {
  bestBookPerCategory: {
    setting: BookBayesianSetting;
    plot: BookBayesianSetting;
    engagement: BookBayesianSetting;
    characters: BookBayesianSetting;
    style: BookBayesianSetting;
  };
  bestSingleBook: {
    book: string;
    percentiles: {
      medianPercentile: number;
    } & BookRatings;
  };
  mostControversialBook: {
    book: string;
    percentiles: {
      medianPercentile: number;
    } & BookRatings;
  };
  worstBook: {
    book: string;
    percentiles: {
      medianPercentile: number;
    } & BookRatings;
  };
};

export type BookRatings = {
  setting: number;
  plot: number;
  engagement: number;
  characters: number;
  style: number;
};

export type BookBayesianSetting = {
  book: string;
  bayesianSetting: number;
  userCount: number;
};

export type BooksStatsDto = {
  best_books_per_category: {
    setting: BookBayesianSettingDto;
    plot: BookBayesianSettingDto;
    engagement: BookBayesianSettingDto;
    characters: BookBayesianSettingDto;
    style: BookBayesianSettingDto;
  };
  single_best_book: {
    book: string;
    percentiles: {
      median_percentile: number;
    } & BookRatings;
  };
  most_controversial_book: {
    book: string;
    percentiles: {
      median_percentile: number;
    } & BookRatings;
  };
  worst_book: {
    book: string;
    percentiles: {
      median_percentile: number;
    } & BookRatings;
  };
};

export type BookBayesianSettingDto = {
  Book: string;
  Bayesian_plot: number;
  "User Count": number;
};
