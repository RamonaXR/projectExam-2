import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editVenue } from "../utils/venueApi";

/**
 * Custom hook to edit a venue.
 *
 * This hook leverages react-query's useMutation to perform an API call to edit a venue.
 * Upon a successful update, it invalidates the queries for the specific venue and the overall venues list,
 * ensuring that the latest data is refetched.
 *
 * @returns {object} The mutation object returned by useMutation, which includes properties such as mutate, isLoading, isError, etc.
 *
 * @example
 * const { mutate: editVenueMutate } = useEditVenue();
 * // To edit a venue with id '123':
 * editVenueMutate({ venueId: '123', name: 'New Venue Name', ...otherData });
 */
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
