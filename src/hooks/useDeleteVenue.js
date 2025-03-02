import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL, API_KEY } from "../constants";
import { useAuthStore } from "../store/authStore";

/**
 * Custom hook to delete a venue.
 *
 * This hook leverages react-query's useMutation to send a DELETE request to the API endpoint for deleting a venue.
 * It uses the user's access token (if available) for authorization. On successful deletion (HTTP status 204), the venueId is returned,
 * and the "venues" query is invalidated to refresh the venue list.
 *
 * @returns {object} The mutation object returned by useMutation, including properties such as mutate, isLoading, isError, etc.
 *
 * @example
 * const { mutate: deleteVenue } = useDeleteVenue();
 * // To delete a venue with id '123':
 * deleteVenue('123');
 */
export function useDeleteVenue() {
  const token = useAuthStore((state) => state.userProfile?.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (venueId) => {
      const response = await fetch(
        `${API_BASE_URL}/holidaze/venues/${venueId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-Noroff-API-Key": API_KEY,
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        },
      );

      if (response.status !== 204) {
        const data = await response.json();
        throw new Error(
          data.errors
            ? data.errors.map((err) => err.message).join(", ")
            : "Delete venue failed",
        );
      }
      return venueId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["venues"]);
    },
  });
}
