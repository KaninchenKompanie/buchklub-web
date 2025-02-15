import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchReviews } from "../api";

export const useReviews = () => {
  const { data, ...result } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => fetchReviews(),
    staleTime: Infinity,
  });
  const reviews = useMemo(() => data || [], [data]);
  return {
    reviews: reviews,
    ...result,
  };
};
