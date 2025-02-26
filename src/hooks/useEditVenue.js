import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL, API_KEY } from "../constants";
import { useAuthStore } from "../store/authStore";

export function useEditVenue() {
  const token = useAuthStore((state) => state.userProfile?.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ venueId, ...venueData }) => {
      const payload = {
        name: venueData.name,
        description: venueData.description,
        media:
          venueData.mediaUrls && venueData.mediaUrls.length > 0
            ? venueData.mediaUrls.map((url) => ({ url, alt: "Venue image" }))
            : [],
        price: Number(venueData.price),
        maxGuests: Number(venueData.maxGuests),
        rating: Number(venueData.rating) || 0,
        meta: {
          wifi: venueData.meta?.wifi || false,
          parking: venueData.meta?.parking || false,
          breakfast: venueData.meta?.breakfast || false,
          pets: venueData.meta?.pets || false,
        },
      };

      const response = await fetch(
        `${API_BASE_URL}/holidaze/venues/${venueId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Noroff-API-Key": API_KEY,
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(payload),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.errors
            ? data.errors.map((err) => err.message).join(", ")
            : "Venue update failed",
        );
      }
      return data;
    },
    onSuccess: (_, { venueId }) => {
      queryClient.invalidateQueries({ queryKey: ["venue", venueId] });
    },
  });
}
