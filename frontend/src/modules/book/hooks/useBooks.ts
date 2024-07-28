import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "../api";
import { booksCacheKey } from "../configurations/constants";

export const useBooks = () => {
  const { data, ...result } = useQuery({
    queryKey: [booksCacheKey],
    queryFn: () => fetchBooks(),
    staleTime: Infinity,
  });

  return {
    books: data || [],
    ...result,
  };
};
