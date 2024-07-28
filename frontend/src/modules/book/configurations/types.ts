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
  mostLikedBook: {
    book: string;
    bayesianAverages: BookRatingExtended;
  };
  lessLikedBook: {
    book: string;
    bayesianAverages: BookRatingExtended;
  };
  mostControversialBook: {
    book: string;
    standardDeviation: BookRatingBasic;
    recommendPercentage: number;
  };
  bookStats: BookStatMeta[];
};

export type BookRatingBasic = {
  setting: number;
  plot: number;
  engagement: number;
  characters: number;
  style: number;
};

export type BookRatingExtended = {
  totalAverageRating: number;
  recommendPercentage: number;
} & BookRatingBasic;

export type BookRatingExtendedDto = {
  total_average_rating: number;
  recommended_percentage: number;
} & BookRatingBasic;

export type BookBayesianSetting = {
  book: string;
  bayesianAverage: number;
  userCount: number;
};

export type BooksStatsDto = {
  best_books_per_category: {
    setting: BookBayesianSettingDto;
    plot: BookBayesianSettingDto;
    engagement: BookBayesianSettingDto;
    characters: BookBayesianSettingDto;
    style: BookBayesianSettingDto;
    recommend: BookBayesianSettingDto;
    total_average_rating: number;
    recommend_percentage: number;
  };
  most_liked_book: {
    book: string;
    bayesian_averages: BookRatingExtendedDto;
  };
  less_liked_book: {
    book: string;
    bayesian_averages: BookRatingExtendedDto;
  };
  most_controversial_book: {
    book: string;
    standard_deviation: BookRatingBasic;
    recommend_percentage: number;
  };
  all_books_stats: BookStatMetaDto[];
};

export type BookStatMetaDto = {
  recommend_percentage: number;
  total_average_rating: number;
  book_id: string;
  book_name: string;
  rating_count: number;
} & BookRatingBasic;

export type BookStatMeta = {
  recommendPercentage: number;
  totalAverageRating: number;
  bookId: string;
  bookName: string;
  ratingCount: number;
} & BookRatingBasic;

export type BookBayesianSettingDto = {
  Book: string;
  Bayesian_average: number;
  "User Count": number;
};

export type CreateBookReview = {
  bookId: number;
  userId: number;
  recommend: boolean;
  comment: string;
} & BookRatingBasic;

export type BookReviewsDto = {
  id: number;
  book_id: number;
  user_id: number;
  recommend: boolean;
  comment: string;
} & BookRatingBasic

export type BookReviews = {
  id: number;
  bookId: number;
  userId: number;
  recommend: boolean;
  comment: string;
} & BookRatingBasic;
