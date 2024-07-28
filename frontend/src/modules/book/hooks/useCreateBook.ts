import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBook } from "../api";

export default function useCreateBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
}
