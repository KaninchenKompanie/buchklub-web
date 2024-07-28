import { axios } from "@/lib/axios";

export function getBooksStats() {
  return axios.get("/books/stats");
}
