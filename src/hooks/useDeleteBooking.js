import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL, API_KEY } from "../constants";
import { useAuthStore } from "../store/authStore";

/**
 * Custom hook to delete a booking.
 *
 * This hook leverages react-query's useMutation to send a DELETE request to the API endpoint
 * for deleting a booking. It uses the user's access token (if available) for authorization.
 * On successful deletion (HTTP status 204), the booking id is returned and the "profile" query is invalidated
 * to refresh any relevant cached data.
 *
 * @returns {object} The mutation object returned by useMutation, containing properties such as mutate, isLoading, and isError.
 *
 * @example
 * const { mutate: deleteBooking } = useDeleteBooking();
 * // To delete a booking with id '123':
 * deleteBooking('123');
 */
export function useDeleteBooking() {
  const token = useAuthStore((state) => state.userProfile?.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingId) => {
      const response = await fetch(
        `${API_BASE_URL}/holidaze/bookings/${bookingId}`,
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
            : "Delete booking failed",
        );
      }
      return bookingId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
    },
  });
}
