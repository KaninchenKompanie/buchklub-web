import { axios } from "@/lib/axios";
import { mapBooksStatsDtoToBookStats } from "../mappers";
import { Book, BooksStats } from "../configurations/types";

export async function fetchBooksStats(): Promise<BooksStats> {
  return mapBooksStatsDtoToBookStats(await axios.get("/books/stats"));
}

export async function fetchBooks(): Promise<Book[]> {
  return await axios.get("/books");
}
