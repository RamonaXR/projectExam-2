import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editVenue } from "../utils/venueApi";

export function useEditVenue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editVenue,
    onSuccess: (_, { venueId }) => {
      queryClient.invalidateQueries({ queryKey: ["venue", venueId] });
      queryClient.invalidateQueries({ queryKey: ["venues"] });
    },
  });
}
