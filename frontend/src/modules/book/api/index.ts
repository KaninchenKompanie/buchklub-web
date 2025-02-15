import { axios } from "@/lib/axios";
import { urlPaths } from "@/modules/common/configurations/constants";
import {
  Book,
  BookReviews,
  BookReviewsDto,
  BooksStats,
  CreateBook,
  CreateBookReview,
} from "../configurations/types";
import {
  mapBookReviewsDtoToBookReviews,
  mapBooksStatsDtoToBookStats,
  mapCreateBookReviewToCreateBookReviewDto,
} from "../mappers";

export async function fetchBooksStats(): Promise<BooksStats> {
  const result = (await axios.get(`${urlPaths.reviews}/stats/`)).data;
  return mapBooksStatsDtoToBookStats(result);
}

export async function fetchBooks(): Promise<Book[]> {
  return (await axios.get(`${urlPaths.books}`)).data;
}

export async function createBook(book: CreateBook): Promise<Book[]> {
  return await axios.post(`${urlPaths.books}`, book);
}

export async function fetchReviews(): Promise<BookReviews[]> {
  const result = (await axios.get(`${urlPaths.reviews}`))
    .data as BookReviewsDto[];
  return result.map((item) => mapBookReviewsDtoToBookReviews(item));
}

export async function submitReview(
  review: CreateBookReview
): Promise<BookReviews> {
  return await axios.post(
    `${urlPaths.reviews}`,
    mapCreateBookReviewToCreateBookReviewDto(review)
  );
}
