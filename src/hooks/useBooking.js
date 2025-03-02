import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL, API_KEY } from "../constants";
import { useAuthStore } from "../store/authStore";

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
