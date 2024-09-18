import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api";
import { usersCacheKey } from "../configurations/constants";

export const useUsers = () => {
  const { data, ...result } = useQuery({
    queryKey: [usersCacheKey],
    queryFn: () => fetchUsers(),
    staleTime: Infinity,
  });

  return {
    users: data || [],
    ...result,
  };
};
