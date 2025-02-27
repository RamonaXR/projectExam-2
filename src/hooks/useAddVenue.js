import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addVenue } from "../utils/venueApi";

export function useAddVenue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addVenue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["venues"] });
    },
  });
}
