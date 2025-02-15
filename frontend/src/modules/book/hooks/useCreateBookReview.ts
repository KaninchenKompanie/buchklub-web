import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { submitReview } from "../api";

export default function useCreateBookReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast.success("Nice review thanks");
    },
    onError: () => {
      toast.error("sorry something went wrong");
    },
  });
}
