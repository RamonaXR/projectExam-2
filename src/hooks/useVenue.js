import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../constants";

export function useVenue(venueId) {
  return useQuery({
    queryKey: ["venue", venueId],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/holidaze/venues/${venueId}?_owner=true&_bookings=true`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch venue data.");
      }
      const data = await response.json();
      return data.data;
    },
  });
}
