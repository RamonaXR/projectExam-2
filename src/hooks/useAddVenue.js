import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addVenue } from "../utils/venueApi";

/**
 * Custom hook to add a new venue.
 *
 * This hook leverages react-query's useMutation to execute the `addVenue` API call.
 * On successful addition of a venue, it invalidates the "venues" query to ensure
 * that the venue list is refreshed with the newly added venue.
 *
 * @returns {object} The mutation object returned by useMutation, which includes
 * properties such as mutate, isLoading, isError, and others related to the mutation state.
 */
export function useAddVenue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addVenue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["venues"] });
    },
  });
}
