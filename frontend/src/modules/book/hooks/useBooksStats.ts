import { useQuery } from "@tanstack/react-query";
import { fetchBooksStats } from "../api";
import { booksCacheKey } from "../configurations/constants";

export default function useBooksStats() {
  const { data, ...result } = useQuery({
    queryKey: [booksCacheKey, "stats"],
    queryFn: () => fetchBooksStats(),
    staleTime: Infinity,
  });

  return {
    booksStats: data,
    ...result,
  };
}
