import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL, API_KEY } from "../constants";
import { useAuthStore } from "../store/authStore";

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
