import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL, API_KEY } from "../constants";
import { useAuthStore } from "../store/authStore";

/**
 * Custom hook to create a new booking.
 *
 * This hook leverages react-query's useMutation to execute a POST request to create a booking.
 * It sends the booking payload to the API endpoint using the provided API key and user access token (if available).
 * Upon a successful booking, it invalidates the cache for the corresponding venue to refresh its data.
 *
 * @returns {object} The mutation object returned by useMutation. This object includes properties like mutate, isLoading, isError, etc.
 *
 * @example
 * const bookingMutation = useBooking();
 *
 * // To create a booking:
 * bookingMutation.mutate({ venueId: '123', dateFrom: '2025-01-01', dateTo: '2025-01-05', guests: 2 });
 */
export function useBooking() {
  const token = useAuthStore((state) => state.userProfile?.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingPayload) => {
      const response = await fetch(`${API_BASE_URL}/holidaze/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": API_KEY,
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(bookingPayload),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.errors
            ? data.errors.map((err) => err.message).join(", ")
            : "Booking failed",
        );
      }
      return response.json();
    },
    onSuccess: (_, { venueId }) => {
      queryClient.invalidateQueries({ queryKey: ["venue", venueId] });
    },
  });
}
