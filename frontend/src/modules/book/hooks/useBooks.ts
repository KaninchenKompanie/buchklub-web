import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "../api";

/** Fetches all non deleted brains */
export const useBooks = () => {
  const { data, ...result } = useQuery({
    queryKey: ["books"],
    queryFn: () => fetchBooks(),
    staleTime: Infinity,
  });

  return {
    books: data || [],
    ...result,
  };
};
