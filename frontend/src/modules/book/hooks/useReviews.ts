import { useQuery } from "@tanstack/react-query";
import { fetchReviews } from "../api";

export const useReviews = () => {
    const { data, ...result } = useQuery({
        queryKey: ["reviews"],
        queryFn: () => fetchReviews(),
        staleTime: Infinity,
    })
    return {
        reviews: data  || [],
        ...result,
    }
}