import { axios } from "@/lib/axios";
import { mapBooksStatsDtoToBookStats } from "../mappers";
import { Book, BooksStats, CreateBook } from "../configurations/types";
import { urlPaths } from "@/modules/common/configurations/constants";

export async function fetchBooksStats(): Promise<BooksStats> {
  return mapBooksStatsDtoToBookStats(
    (await axios.get(`${urlPaths.books}/stats`)).data
  );
}

export async function fetchBooks(): Promise<Book[]> {
  return (await axios.get(`${urlPaths.books}`)).data;
}

export async function newBook(book: CreateBook): Promise<Book[]> {
  return (await axios.post(`${urlPaths.books}`, book));
}
